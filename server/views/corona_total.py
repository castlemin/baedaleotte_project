from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from models.test_table import Corona_Daily, test_table

bp = Blueprint("corona_total", __name__, url_prefix="/corona_total")

# 코로나 전체 데이터 뿌려주기
@bp.route("/")
def corona_total_page():
    # if request.method == "GET":
    daily_corona = Corona_Daily.query.filter(Corona_Daily.JCG_DT == "2021-12-28").first()
    # test = test_table.query.all()
    # return daily_corona
    # else:
    return render_template("main.html", corona_list=daily_corona)
