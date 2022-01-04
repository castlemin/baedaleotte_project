import json

from flask import Blueprint, Flask, Response, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
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


# 코로나 전체 데이터 뿌려주기
@bp.route("")
def getCoronaTotal():
    daily_corona = CoronaDaily.query.filter(CoronaDaily.JCG_DT == "2021.12.28.00").first()
    cor_res = json.dumps(daily_corona, cls=AlchemyEncoder, ensure_ascii=False)
    jcg = EngKorJCG.query.all()
    # jcg_res = json.dumps(jcg, cls=AlchemyEncoder, ensure_ascii=False)
    res = find_korean_match(jcg, cor_res)

    return Response(json.dumps(res, ensure_ascii=False), mimetype="application/json")
