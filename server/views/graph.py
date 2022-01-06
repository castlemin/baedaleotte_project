# 데이터분석에서 작성한 py 파일 import
import imp
import importlib.util
from flask import Blueprint, session, request, Response, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from api_requests.geocoding import getKoreanJCG

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


bp = Blueprint("graph", __name__, url_prefix="/data")


@bp.route("/user_location", methods=['POST'])
def get_user_location():
    lat = request.json['lat']
    lng = request.json['lng']

    region = getKoreanJCG(lat, lng)

    res = {
        "region": region
    }

    return jsonify(res)


@bp.route("/vac")
def get_vac():
    return da.백신현황(da.vac_data)


@bp.route("/seoul_risk_map_all")
def get_seoul_risk_map_all():
    return da.서울코로나위험도지도(da.seoul_corona_score)


# gps 부분에 gps정보가 들어와야 함
@bp.route("/seoul_risk_map")
def get_seoul_risk_map():
    region = request.args['region']
    return da.서울코로나위험도지도(da.seoul_corona_score, region)


@bp.route("/risk_rank")
def get_risk_rank():
    region = request.args['region']
    return da.위험도순위(da.seoul_corona_score, region)


@bp.route("/coronic_all")
def get_coronic_all():
    return da.내지역확진자all(da.corona_data, "서울")


@bp.route("/coronic_gu")
def get_coronic_gu():
    region = request.args['region']
    return da.내지역확진자all(da.corona_data, region)


@bp.route("/risk_score")
def get_risk_score():
    region = request.args['region']
    return da.위험도점수(da.seoul_corona_score, region)

