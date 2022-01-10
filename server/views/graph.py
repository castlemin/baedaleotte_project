# 데이터분석에서 작성한 py 파일 import
import imp
import importlib.util
# send_file은 flask에서 파일을 전송하기 위한 모듈입니다
from flask import Blueprint, session, request, Response, jsonify, send_file
from flask_cors import cross_origin
from apscheduler.schedulers.background import BackgroundScheduler
from api_requests.geocoding import getKoreanJCG
import pandas as pd

spec = importlib.util.spec_from_file_location("da", "dataanalysis/data_analysis.py")
da = importlib.util.module_from_spec(spec)
spec.loader.exec_module(da)


def import_schedule():
    try:
        spec.loader.exec_module(da)
        print("importing success")
    except:
        print("importing failed")


sched = BackgroundScheduler(timezone="Asia/Seoul")
sched.start()
sched.add_job(import_schedule, trigger='cron', hour=0, minute=10)

# 코로나 위험도 합계 점수 및 상세 점수들을 저장해 놓은 csv 파일을 불러옴
점수df = pd.read_csv('./dataanalysis/data/risk_data.csv', index_col='Unnamed: 0')
print(점수df)
# 코로나 상세 점수를 json 형식으로 반환하기 전 dict로 변환하는 함수
def df_dic(df, region):
    dic = {'stack' : df.loc[region]['rate'] + df.loc[region]['코로나신규'],
            'fac' : df.loc[region]['다중이용시설'],
            'population' : df.loc[region]['생활인구'],
            'family' : df.loc[region]['평균가구'],
            'rate' : round((df.loc[region]['rate'] / 0.3), 1),
            'rank' : list(점수df['합계'].sort_values(ascending = False).index).index(region)+1,
    }
    return dic



bp = Blueprint("graph", __name__, url_prefix="/data")


@bp.route("/user_location", methods=['POST'])
@cross_origin()
def get_user_location():
    lat = request.json['lat']
    lng = request.json['lng']

    region = getKoreanJCG(lat, lng)

    res = {
        "region": region
    }

    return jsonify(res)


@bp.route('/vac')
@cross_origin()
def vac():
    return da.백신현황(da.vac_data)

@bp.route('/seoul_risk_map_all')
@cross_origin()
def seoul_risk_map_all():
    return da.서울코로나위험도지도(점수df)

@bp.route('/seoul_risk_map')
@cross_origin()
def seoul_risk_map():
    region = request.args['region']
    if region != '':
        return da.서울코로나위험도지도(점수df, region)
    else:
        return da.서울코로나위험도지도(점수df)

@bp.route('/risk_rank')
@cross_origin()
def risk_rank():
    region = request.args['region']
    return da.위험도순위(점수df, region)

@bp.route('/coronic_all')
@cross_origin()
def coronic_all():
    return da.내지역확진자all(da.coronic_seoul,'서울')

@bp.route('/coronic_gu')
@cross_origin()
def coronic_gu():
    region = request.args['region']
    return da.내지역확진자all(da.coronic_seoul, region)

@bp.route('/risk_score')
@cross_origin()
def risk_score():
    region = request.args['region']
    score = str(점수df.loc[region]['합계'])
    return score

@bp.route('/risk_score_detail')
@cross_origin()
def risk_score_detail():
    region = request.args['region']
    dic = df_dic(점수df, region)
    return jsonify(dic)

# Prophet을 사용해 예측한 내용을 보여주는 그래프
# 기존 그래프와 달라 이미지로 저장후 png 파일을 보내줌
@bp.route('/predict1')
def predict1():
    region = request.args['region']
    file_name = f"./dataanalysis/img/{region}_prophet.png"
    return send_file(file_name,
                     mimetype='image/png',
                     attachment_filename='predict1.png',# 다운받아지는 파일 이름. 
                     as_attachment=True)

@bp.route('/predict2')
def predict2():
    region = request.args['region']
    file_name = f"./dataanalysis/img/{region}_prophet2.png"
    return send_file(file_name,
                     mimetype='image/png',
                     attachment_filename='predict2.png',# 다운받아지는 파일 이름. 
                     as_attachment=True)

print("@@@@@@@@@@@@@@@graph.py is DONE@@@@")