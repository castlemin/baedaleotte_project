import json

from flask import Blueprint, Flask, Response, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from models.corona_daily import CoronaDaily
from models.engkorjcg import EngKorJCG
from utility.todict import AlchemyEncoder

# from models.test_table import

bp = Blueprint("corona_total", __name__, url_prefix="/corona_total")

# 코로나 전체 데이터 뿌려주기
@bp.route("")
def getCoronaTotal():
    daily_corona = CoronaDaily.query.filter(CoronaDaily.JCG_DT == "2021-12-28").first()
    cor_res = json.dumps(daily_corona, cls=AlchemyEncoder, ensure_ascii=False)
    jcg = EngKorJCG.query.all()
    jcg_res = json.dumps(jcg, cls=AlchemyEncoder, ensure_ascii=False)
    # print(jsonify(cor_res))
    return Response(cor_res, mimetype="application/json")
    # return jsonify(cor_res)


# @bp.route("/near")
# def getNearCoronaTotal():
#     user_location = ()
