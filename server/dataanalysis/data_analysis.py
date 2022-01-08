# 모듈 import
import json
import datetime

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objs as go

from plotly.subplots import make_subplots
from plotly.validators.scatter.marker import SymbolValidator
from prophet import Prophet

# 0. 디자인 및 테스트를 위한 변수 선언
# 지도 크기 조정 : width, height
graph_width=550
graph_height=385

# 서울시 코로나 전체 확진자  
term_base = 5 # 신규 확진자 더할 범위(일)
div_base = 10 # term_base 확진자를 나눌 숫자
max_point = 40 # 신규 확진자의 최대 점수

#----------------------------------------------------------------------------------------------------------------
# 1. 코로나 위험도 도출

# 1-1 함수 선언

# 최대값을 100으로 바꾸고 그 기준에 맞추는 함수 (*min-max normalization 아님)
def change_max_to_100(data):
    return (data / max(data)) *100

# 생활인구지수 (유동, 10)
def 생활인구지수(data):
    # 기준일 ID time 형식으로 변경
    data = data[['기준일ID', '시군구명', '총생활인구수']]
    data['기준일ID'] = pd.to_datetime(data['기준일ID'], format='%Y%m%d')
    # 7, 14일 전의 날짜를 구함
    week1 = datetime.date.today() - datetime.timedelta(days=7)
    week2 = datetime.date.today() - datetime.timedelta(days=14)
    # 7, 14일 전의 평균
    data_mean = data[data['기준일ID'].isin([week1, week2])].groupby('시군구명').mean()
    seoul_mean = data_mean.loc['서울시','총생활인구수']
    per = (data_mean.drop('서울시', axis=0)['총생활인구수'] / seoul_mean) * 100
    # per를 min max 정규화 (후에 10을 곱해 코로나 위험도 점수에 더함)
    changed_per = change_max_to_100(per)
    return changed_per

# 평균가구 (고정, 15)
def 평균가구(data):
    data['평균 가구원수'] = change_max_to_100(data['평균 가구원수'])
    data = data.drop(0, axis=0)
    data.set_index('행정구역별(시군구)', inplace = True)
    # Series 로 반환하기 위해 ['평균 가구원수'] 추가
    return data['평균 가구원수']

# 다중이용시설비율 (고정, 5)
def 다중이용시설비율(data):
    temp = data.copy()
    temp['count'] = change_max_to_100(temp['count'] / temp['count'].sum())
    temp.set_index('지역구', inplace=True)
    return temp['count']

# 신규확진자 절대값 (유동, 40)
def 코로나신규(data):
    data = data.iloc[-term_base:, :].sum(axis=0) / div_base
    data.index = data.index.map(lambda x: x.split(' ')[0])
    data = data.apply(lambda x: max_point if x >= max_point else x)
    return data

# 서울시 코로나 신규 확진자 증감률 (유동, 예측, 30)
# 최근 3일 신규 확진자와 예상 3일 확진자 증감률
def get_rate(forecast):
    rate = ((forecast.iloc[-3:]['yhat'].mean() - forecast.iloc[-6:-3]['yhat'].mean()) / forecast.iloc[-6:-3]['yhat'].mean()) * 100
    return rate

# prophet object를 생성하고 훈련 데이터 피팅
def prophet(data):
    #모델 학습
    m = Prophet(changepoint_prior_scale=0.3, weekly_seasonality=True)
    m.fit(data)
    #예측
    predict_days = 3
    future = m.make_future_dataframe(periods=predict_days)
    forecast = m.predict(future)
  
    return forecast, m

# prophet 모델로 예측하고 결과들을 저장할 df 생성 함수
def make_df(data):
    #전처리
    reg_list = data.columns.map(lambda x:x.split(' ')[0]).unique()
    #딕셔너리 생성
    forecast_dic = {}
    model_dic = {}
    rate_df = pd.DataFrame(index = ['rate'])
    for i in reg_list:
        df = pd.DataFrame()
        df['ds'] = data.index
        df['y'] = data[data.columns[data.columns.str.contains(f'{i}')]].values
        result = prophet(df)
        rate = get_rate(result[0])
        rate_df[i] = [rate]
        forecast_dic[i] = result[0]
        model_dic[i] = result[1]
    return rate_df, forecast_dic, model_dic

# 점수 변환 및 합계 추가
def get_score(df):
    weight_dict = {'코로나신규':1, 'rate': 0.3, '생활인구':0.1, '평균가구':0.15, '다중이용시설': 0.05}
    weight_df = pd.Series(weight_dict)
    df = df * weight_df
    df['합계'] = df.sum(axis=1)
    df = round(df, 1)
    return df

# 코로나 위험도 점수 반환 함수
def 위험도점수(data, region):
    return str(data.loc[region]['합계'])
    
# 코로나 확진자 데이터 전처리 함수
def processing(data):
    data = data.iloc[:31].rename(columns={'서추구 추가':'서초구 추가'})
    data['자치구 기준일'] = pd.to_datetime(data['자치구 기준일'].apply(lambda x:''.join(x.split('.')[:-1])), format='%Y%m%d')
    data = data.set_index('자치구 기준일').sort_values('자치구 기준일')
    data['서울 전체'] = data[data.columns[data.columns.str.contains('전체')]].sum(axis=1)
    data['서울 추가'] = data[data.columns[data.columns.str.contains('추가')]].sum(axis=1)
    #전처리 후 데이터 리턴
    return data

# 코로나 위험도 점수 계산 함수
def make_score(coronic_seoul):
    #코로나 추가 컬럼만 추출
    coronic_new = coronic_seoul[coronic_seoul.columns[coronic_seoul.columns.str.contains('추가')]].drop(['기타 추가', '서울 추가'], axis=1)

    #각 함수 적용하여 점수 도출
    rate_df, forecast_dic, model_dic = make_df(coronic_new)
    risk_data = rate_df.T.sort_index()
    risk_data['생활인구'] = 생활인구지수(생활인구)
    risk_data['코로나신규'] = 코로나신규(coronic_new)
    risk_data['평균가구'] = 평균가구(가구)
    risk_data['다중이용시설'] = 다중이용시설비율(다중이용시설)
    risk_data = get_score(risk_data)

    #그래프 2개씩 저장
    #reg_list는 변경 가능 (직접 리스트 지정하거나 risk_data index 활용하거나 등)
    reg_list = risk_data.index
    for reg in reg_list:
        model_dic[reg].plot(forecast_dic[reg]).savefig(f'./dataanalysis/img/{reg}_prophet.png')
        model_dic[reg].plot_components(forecast_dic[reg]).savefig(f'./dataanalysis/img/{reg}_prophet2.png')
    path = './dataanalysis/data/'
    risk_data.to_csv(path + 'risk_data.csv')
	#리턴값 없음


# -----------------------------------------------------------

# 1-2 필요 데이터 로드
생활인구 = pd.read_csv('./dataanalysis/data/자치구단위 서울생활인구 일별 집계표.csv', encoding='euc-kr')
가구 = pd.read_csv('./dataanalysis/data/가구주의_연령_및_가구원수별_가구_일반가구___시군구_합계.csv', encoding='euc-kr', header=1)[['행정구역별(시군구)','평균 가구원수']]
다중이용시설 = pd.read_csv('./dataanalysis/data/지역구다중이용시설수.csv')
coronic_seoul = pd.read_csv('./dataanalysis/data/서울특별시 코로나19 자치구별 확진자 발생동향.csv', encoding='euc-kr')
coronic_seoul = processing(coronic_seoul)

#1-3 사용
# 실제 코드
점수df = make_score(coronic_seoul)
# 테스트용 코드 이거 없으면 새로 학습해서 오래 걸림
# 점수df = pd.read_csv('./dataanalysis/data/risk_data.csv', index_col='Unnamed: 0')

# --------------------------------------------------------------------


# 2. 시작화 자료 생성

# geojson lead
with open('./dataanalysis/data/seoul_map.geojson', encoding='UTF-8') as f:
    seoul_geojson = json.load(f)

#  서울시 코로나 위험도 지도
def 서울코로나위험도지도(data, region="서울"):

    # add_trace를 통해 marker를 2번 그리는 방식으로 외곽선 표시
    fig = go.Figure()

    # 서울 전체의 marker를 그림
    fig.add_trace(
        go.Choroplethmapbox(
            geojson=seoul_geojson,  # geojson
            locations=data.index,  # marker가 표기될 지역
            z=data["합계"],  # marker의 값
            colorscale=[
                [0, "rgba(0, 128, 0, 1)"],
                [0.4, "rgba(255, 255, 0, 1)"],
                [0.6, "rgba(255, 128, 0, 1)"],
                [1, "rgba(255, 0, 0, 1)"],
            ],  # marker의 scale
            zmin=0,
            zmax=100,
            featureidkey="properties.SIG_KOR_NM",  # locations와 geojson을 매칭할 key
            marker_opacity=0.6,
            marker_line_width=1,
            name="", hovertemplate = "<b>%{location}</b><br><br>위험도 : %{z}점"
        )
    )
    if region != "서울":
        fig.add_trace(
            go.Choroplethmapbox(
                geojson=seoul_geojson,
                locations=[region],
                z=[data.loc[region]['합계']],
                colorscale=[
                    [0, "rgba(0, 128, 0, 0)"],
                    [0.4, "rgba(255, 255, 0, 0)"],
                    [0.6, "rgba(255, 128, 0, 0)"],
                    [1, "rgba(255, 0, 0, 0)"],
                ],  # raba의 a값을 0으로 주어 투명으로 덧칠
                zmin=0,
                zmax=100,
                featureidkey="properties.SIG_KOR_NM",
                marker_opacity=0.6,
                marker_line_width=5,  # marker_line을 굵게 덧칠
                marker_line_color=px.colors.qualitative.G10[0],
                # marker 옵션은 아래처럼 표현도 가능
                # marker=dict(opacity=1, line=dict(color='black', width=10)),
                name="", hovertemplate = "<b>%{location}</b><br><br>위험도 : %{z}점"
            )
        )
    # fig의 layout 설정
    fig.update_layout(
        mapbox_style="carto-positron",  # 맵의 테마 설정 (open-street-map, white-bg, carto-positron, stamen-terrain 등)
        mapbox_zoom=9.8,
        margin={"r": 0, "t": 0, "l": 0, "b": 0},
        mapbox_center={"lat": 37.5645679, "lon": 126.9688672},
        width=graph_width, 
        height=graph_height, hoverlabel=dict(font_size=15)
        
    )

    if region != "서울":
        gcs = pd.read_csv("./dataanalysis/data/서울시 행정구역 좌표계.csv")
        gcs = gcs[["시군구명_한글", "위도", "경도"]]
        lat = gcs[gcs["시군구명_한글"] == region]["위도"].iloc[0]
        lon = gcs[gcs["시군구명_한글"] == region]["경도"].iloc[0]
        fig.update_layout(mapbox_center={"lat": lat, "lon": lon}, mapbox_zoom=11.2)
    
    return fig.to_json()
    

# 서울 내 내 지역 위험도 순위 그래프

def 위험도순위(data, region):
    data = data['합계'].sort_values(ascending = False)
    index = list(data.index).index(region)
    colors = ['lightslategray'] * len(data)
    colors[index] = px.colors.qualitative.G10[0]

    bar_data = go.Bar(x=data.index, y=data.values, marker_color=colors, opacity=0.8, name='위험도 점수', hovertemplate='%{y}')
    layout = go.Layout(template='gridon', width = graph_width, height=graph_height,)

    fig = go.Figure(data=bar_data, layout=layout)

    fig.update_layout(hovermode='x unified')
    fig.update_xaxes(tickangle=45)

    return fig.to_json()

# 지역 확진자 그래프
def 내지역확진자all(data, region):
    #전처리 함수 실행
    data = data[-7:].reset_index()
    data['자치구 기준일'] = data['자치구 기준일'].apply(lambda x:x.strftime('%Y.%m.%d'))
    
    reg = data[data.columns[data.columns.str.contains(region)].tolist() + ['자치구 기준일']]

    # Create figure with secondary y-axis
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # Add traces
    fig.add_trace(
        go.Bar(x=reg['자치구 기준일'], y=reg[f'{region} 전체'], name=f"{region} 전체 확진자",text=reg[f'{region} 전체'],
                        textposition="outside",textfont_size=15,  marker_color=px.colors.qualitative.G10[0], opacity=0.8,
                         hovertemplate = "%{y}"),
        secondary_y=False)

    fig.add_trace(
        go.Scatter(mode='lines+markers+text', x=reg['자치구 기준일'], y=reg[f'{region} 추가'], name=f"{region} 추가 확진자",
                   marker_color='rgb(255,127,0)', marker=dict(size=12,line=dict(width=2, color='white')),
                   text=reg[f'{region} 추가'], textposition="bottom center", textfont = {'color':'white', 'size':13}, hovertemplate = "%{y}"),
        secondary_y=True)
    
    # Add figure title
    fig.update_layout(template='gridon', bargap=0.5, width = graph_width, height=graph_height,)
    fig.update_layout(hovermode="x unified")

    # Set x-axis title
    # fig.update_xaxes(title_text="date")
    # Set y-axes titles
    
    if region != '서울':
        fig.update_yaxes(title_text="전체 확진자 수(명)", secondary_y=False, range=[0, max(reg[f'{region} 전체'])+2000])
        fig.update_yaxes(title_text="추가 확진자 수(명)", secondary_y=True, range=[0, max(reg[f'{region} 추가'])+100])
    else:
        fig.update_yaxes(title_text="전체 확진자 수(명)", secondary_y=False, range=[0, max(reg[f'{region} 전체'])+20000])
        fig.update_yaxes(title_text="추가 확진자 수(명)", secondary_y=True, range=[0, max(reg[f'{region} 추가'])+1000])
    return fig.to_json()


def 백신현황(data):
    vac = data.dropna()[:7]
    vac = vac.sort_values('접종일')
    fig = make_subplots(rows=3, cols=1,shared_xaxes=True)
    #1차접종 그래프
    fig.add_trace(go.Scatter(x=vac['접종일'], y=vac['1차접종률(%)'],
                            mode='lines+markers+text',
                            name='1차접종률(%)',text=vac['1차접종률(%)'],
                            textposition="bottom center", hovertemplate = "%{y}"),1,1)
    #2차접종 그래프
    fig.add_trace(go.Scatter(x=vac['접종일'], y=vac['2차접종률(%)'],
                        mode='lines+markers+text',
                        name='2차접종률(%)',text=vac['2차접종률(%)'],
                        textposition="bottom center", hovertemplate = "%{y}"),2,1)
    #추가접종 그래프
    fig.add_trace(go.Scatter(x=vac['접종일'], y=vac['추가접종률(%)'],
                        mode='lines+markers+text',
                        name='추가접종률(%)',text=vac['추가접종률(%)'],
                        textposition="bottom center", hovertemplate = "%{y}"),3,1)
    fig.update_layout(template='gridon', width = 630, height=graph_height,)
    
    fig['layout']['yaxis'].update(range=[min(vac['1차접종률(%)'])-10, max(vac['1차접종률(%)'])+5])
    fig['layout']['yaxis2'].update(range=[min(vac['2차접종률(%)'])-10, max(vac['2차접종률(%)'])+5])
    fig['layout']['yaxis3'].update(range=[min(vac['추가접종률(%)'])-10, max(vac['추가접종률(%)'])+5])
#     fig.update_yaxes(title_text="전체 확진자 수(명)", range=[0, max(vac['1차접종률(%)'])+10])
#     return fig.to_json()
    fig.update_layout(hovermode="x unified")
    return fig.to_json()
    
vac_data = pd.read_csv('./dataanalysis/data/서울특별시 코로나19 백신 예방접종 현황.csv', encoding='euc-kr')
#백신현황(vac_data)