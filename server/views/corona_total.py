import json

from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from models.test_table import Corona_Daily

# from models.test_table import

bp = Blueprint("corona_total", __name__, url_prefix="/corona_total")

# 코로나 전체 데이터 뿌려주기
@bp.route("/")
def corona_total_page():
    # if request.method == "GET":
    daily_corona = Corona_Daily.query.filter(Corona_Daily.JCG_DT == "2021-12-28").first()
    fields = [
        "JCG_DT",
        "JONGNO",
        "JONGNOADD",
        "JUNGGU",
        "JUNGGUADD",
        "YONGSAN",
        "YONGSANADD",
        "SEONGDONG",
        "SEONGDONGADD",
        "GWANGJIN",
        "GWANGJINADD",
        "DDM",
        "DDMADD",
        "JUNGNANG",
        "JUNGNANGADD",
        "SEONGBUK",
        "SEONGBUKADD",
        "GANGBUK",
        "GANGBUKADD",
        "DOBONG",
        "DOBONGADD",
        "NOWON",
        "NOWONADD",
        "EP",
        "EPADD",
        "SDM",
        "SDMADD",
        "MAPO",
        "MAPOADD",
        "YANGCHEON",
        "YANGCHEONADD",
        "GANGSEO",
        "GANGSEOADD",
        "GURO",
        "GUROADD",
        "GEUMCHEON",
        "GEUMCHEONADD",
        "YDP",
        "YDPADD",
        "DONGJAK",
        "DONGJAKADD",
        "GWANAK",
        "GWANAKADD",
        "SEOCHO",
        "SEOCHOADD",
        "GANGNAM",
        "GANGNAMADD",
        "SONGPA",
        "SONGPAADD",
        "GANGDONG",
        "GANGDONGADD",
        "ETC",
        "ETCADD",
    ]
    corona_dict = {}
    for gu in fields:
        exec("corona_dict[gu] = daily_corona." + gu)
    print(corona_dict)
    return jsonify(corona_dict)
