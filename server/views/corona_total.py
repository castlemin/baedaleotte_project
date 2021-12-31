import json

from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from models.corona_daily import Corona_Daily
from utility.todict import AlchemyEncoder

# from models.test_table import

bp = Blueprint("corona_total", __name__, url_prefix="/corona_total")

# 코로나 전체 데이터 뿌려주기
@bp.route("/")
def corona_total_page():
    # if request.method == "GET":
    daily_corona = Corona_Daily.query.filter(Corona_Daily.JCG_DT == "2021-12-28").first()
    res = json.dumps(daily_corona, cls=AlchemyEncoder, ensure_ascii=False)
    return res
