# 모듈 import
import numpy as np
import pandas as pd
import json
import plotly.express as px
import plotly.graph_objs as go
import plotly.io as pio
from plotly.subplots import make_subplots
from plotly.validators.scatter.marker import SymbolValidator
from prophet import Prophet


# 0. 데이터 전처리

# 위험도 점수
# 위험도 점수가 아직 안나와서 임의 데이터 생성
# index = ['점수'], columns = ['자치구']
seoul_corona_score = pd.DataFrame(columns = ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구',
       '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구',
       '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구',
       '관악구', '서초구', '강남구', '송파구', '강동구'])
seoul_corona_score.loc['점수'] = list(np.random.randint(0, 100, (25)))
seoul_corona_score = seoul_corona_score.astype(float)

# 코로나 위험도 점수 반환 함수
def 위험도점수(data, region):
    return str(data[region][0])


# 코로나 확진자 데이터
# 전처리 함수
def processing(data):
    data = data.iloc[:31].rename(columns={'서추구 추가':'서초구 추가'})
    data['자치구 기준일'] = pd.to_datetime(data['자치구 기준일'].apply(lambda x:''.join(x.split('.')[:-1])), format='%Y%m%d')
    data = data.set_index('자치구 기준일').sort_values('자치구 기준일')
    data['서울 전체'] = data[data.columns[data.columns.str.contains('전체')]].sum(axis=1)
    data['서울 추가'] = data[data.columns[data.columns.str.contains('추가')]].sum(axis=1)
    #전처리 후 데이터 리턴
    return data

corona_data = pd.read_csv('./data/서울특별시 코로나19 자치구별 확진자 발생동향.csv', encoding='euc-kr')
ori_data = processing(corona_data)


# -----------------------------------------------------------

# 1. 시작화 자료 생성

# geojson lead
with open('./data/seoul_map.geojson', encoding='UTF-8') as f:
    seoul_geojson = json.load(f)

# 서울시 코로나 위험도 지도
def 서울코로나위험도지도(data, region='서울'):
    # add_trace를 통해 marker를 2번 그리는 방식으로 외곽선 표시
    fig = go.Figure()

    # 서울 전체의 marker를 그림
    fig.add_trace(go.Choroplethmapbox(geojson=seoul_geojson, # geojson
                                        locations=data.columns ,  # marker가 표기될 지역
                                        z=data.loc['점수'], # marker의 값
                                        colorscale=[[0, 'rgba(0, 128, 0, 1)'], [0.5, 'rgba(255, 255, 0, 1)'], [1.0, 'rgba(255, 0, 0, 1)']], # marker의 scale
                                        zmin=0, zmax=100,
                                        featureidkey = 'properties.SIG_KOR_NM', # locations와 geojson을 매칭할 key
                                        marker_opacity=0.6, marker_line_width=1
                                        ))
    if region != '서울':
        fig.add_trace(go.Choroplethmapbox(geojson=seoul_geojson, 
                                            locations=[region] , 
                                            z=data[region],
                                            colorscale=[[0, 'rgba(0, 128, 0, 0)'], [0.5, 'rgba(255, 255, 0, 0)'], [1.0, 'rgba(255, 0, 0, 0)']], # raba의 a값을 0으로 주어 투명으로 덧칠
                                            zmin=0, zmax=100,
                                            featureidkey = 'properties.SIG_KOR_NM',
                                            marker_opacity=0.6, marker_line_width=3, # marker_line을 굵게 덧칠
                                            marker_line_color='blue'
                                            # marker 옵션은 아래처럼 표현도 가능
                                            # marker=dict(opacity=1, line=dict(color='black', width=10)),
                                            ))
    # fig의 layout 설정
    fig.update_layout(mapbox_style="open-street-map",
                    mapbox_zoom=9.8, 
                    mapbox_center = {'lat': 37.5645679, 'lon': 126.9688672},
                    margin={"r":0,"t":0,"l":0,"b":0}
                    )
                    
    return fig.to_json()
    

# 서울 내 내 지역 위험도 순위 그래프
def 위험도순위(data, region):
    data = data.loc['점수'].sort_values(ascending = False)
    index = list(data.index).index(region)
    colors = ['lightslategray'] * len(data)
    colors[index] = 'blue'

    bar_data = go.Bar(x=data.index, y=data.values, marker_color=colors)
    layout = go.Layout(title=f'{region}의 위험도 순위는 {index+1}위 입니다.', template='gridon')

    fig = go.Figure(data=bar_data, layout=layout)

    return fig.to_json()

# 지역 확진자 그래프
def 내지역확진자all(data, region):
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    import plotly.express as px
    #전처리 함수 실행
    data = processing(data)[-7:]
    
    reg = data[data.columns[data.columns.str.contains(region)]]

    # Create figure with secondary y-axis
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # Add traces
    fig.add_trace(
        go.Bar(x=reg.index, y=reg[f'{region} 전체'], name=f"{region} 전체 확진자",text=reg[f'{region} 전체'],
                        textposition="outside",textfont_size=15,  marker_color=px.colors.qualitative.G10[0], opacity=0.8),
        secondary_y=False)

    fig.add_trace(
        go.Scatter(mode='lines+markers+text', x=reg.index, y=reg[f'{region} 추가'], name=f"{region} 추가 확진자",
                   marker_color='rgb(255,127,0)', marker=dict(size=12,line=dict(width=2, color='white')),
                   text=reg[f'{region} 추가'], textposition="bottom center", textfont = {'color':'white', 'size':13}),
        secondary_y=True)
    
    # Add figure title
    fig.update_layout(title_text=f"{region} 전체/추가 확진자({reg.index[0].strftime('%Y-%m-%d')} ~ {reg.index[-1].strftime('%Y-%m-%d')})",
                      template='gridon', bargap=0.5)
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
    vac = data[:10]
    vac = vac.sort_values('접종일')
    fig = make_subplots(rows=3, cols=1,shared_xaxes=True)
    #1차접종 그래프
    fig.add_trace(go.Scatter(x=vac['접종일'], y=vac['1차접종률(%)'],
                            mode='lines+markers+text',
                            name='1차접종률(%)',text=vac['1차접종률(%)'],
                            textposition="bottom center"),1,1)
    #2차접종 그래프
    fig.add_trace(go.Scatter(x=vac['접종일'], y=vac['2차접종률(%)'],
                        mode='lines+markers+text',
                        name='2차접종률(%)',text=vac['2차접종률(%)'],
                        textposition="bottom center"),2,1)
    #추가접종 그래프
    fig.add_trace(go.Scatter(x=vac['접종일'], y=vac['추가접종률(%)'],
                        mode='lines+markers+text',
                        name='추가접종률(%)',text=vac['추가접종률(%)'],
                        textposition="bottom center"),3,1)
    fig.update_layout(title_text=f"1차 / 2차 / 추가 백신 접종률 ({vac['접종일'].iloc[0]} ~ {vac['접종일'].iloc[-1]})", template='gridon')
#     return fig.to_json()
    return fig.to_json()
    
vac_data = pd.read_csv('./data/서울특별시 코로나19 백신 예방접종 현황.csv', encoding='euc-kr')
#백신현황(vac_data)