import json
from datetime import datetime

from flask import Blueprint, Flask, Response, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from flask_cors import cross_origin
from models.corona_daily import CoronaDaily
from models.engkorjcg import EngKorJCG
from utility.todict import AlchemyEncoder

# from models.test_table import

bp = Blueprint("corona_total", __name__, url_prefix="/corona_total")


def find_korean_match(jcg: EngKorJCG, cor_res: json):
    jcg_dict = {}
    for gu in jcg:
        jcg_dict[gu.eng] = gu.kor
        jcg_dict[gu.engadd] = gu.koradd
    # print(jcg_dict)
    test = json.loads(cor_res)
    returning_dict = {}
    for eng_gu in test.keys():
        for eng_gu2 in jcg_dict.keys():
            if eng_gu == eng_gu2:
                returning_dict[jcg_dict[eng_gu2]] = test[eng_gu]
    return returning_dict


def translateSystemClock(userTime: datetime):
    year = str(userTime.year)
    if userTime.month < 10:
        month = "0" + str(userTime.month)
    else:
        month = str(userTime.month)
    if userTime.day < 10:
        day = "0" + str(userTime.day)
    else:
        day = str(userTime.day)
    if userTime.hour < 20:
        day = int(day) - 1
        if day < 10:
            day = "0" + str(day)
    return year + "." + month + "." + day + ".00"


# 코로나 전체 데이터 뿌려주기
@bp.route("/")
@cross_origin()
def getCoronaTotal():
    session["userTime"] = datetime.today()
    userTime = session.get("userTime")
    userDate = translateSystemClock(userTime)
    print(userDate)
    daily_corona = CoronaDaily.query.filter(CoronaDaily.JCG_DT == userDate).first()
    cor_res = json.dumps(daily_corona, cls=AlchemyEncoder, ensure_ascii=False)
    jcg = EngKorJCG.query.all()
    jcg_res = json.dumps(jcg, cls=AlchemyEncoder, ensure_ascii=False)
    res = find_korean_match(jcg, cor_res)
    # return Response(cor_res, mimetype="application/json")
    return Response(json.dumps(res, ensure_ascii=False), mimetype="application/json")
