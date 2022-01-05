# 데이터분석에서 작성한 py 파일 import
import imp
import importlib.util

spec = importlib.util.spec_from_file_location("da", "dataanalysis/data_analysis.py")
da = importlib.util.module_from_spec(spec)
spec.loader.exec_module(da)

from flask import Blueprint

# imp.reload(da)
# 나중에 윤상님이 변환함수 알려주시면 바꿔야 함
region = "관악구"

bp = Blueprint("graph", __name__, url_prefix="/data")


@bp.route("/get_vac")
def get_vac():
    return da.백신현황(da.vac_data)


@bp.route("/get_seoul_risk_map_all")
def get_seoul_risk_map_all():
    return da.서울코로나위험도지도(da.seoul_corona_score)


# gps 부분에 gps정보가 들어와야 함
@bp.route("/get_seoul_risk_map/gps")
def get_seoul_risk_map():
    # return da.서울코로나위험도지도(da.seoul_corona_score, GPS함수(gps정보))
    return da.서울코로나위험도지도(da.seoul_corona_score, region)


@bp.route("/get_risk_rank")
def get_risk_rank():
    return da.위험도순위(da.seoul_corona_score, region)


@bp.route("/get_coronic_all")
def get_coronic_all():
    return da.내지역확진자all(da.corona_data, "서울")


@bp.route("/get_coronic_gu")
def get_coronic_gu():
    return da.내지역확진자all(da.corona_data, region)


@bp.route("/get_risk_score")
def get_risk_score():
    return da.위험도점수(da.seoul_corona_score, region)


# print(da.위험도점수(da.seoul_corona_score, region))
