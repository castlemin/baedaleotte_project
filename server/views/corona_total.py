from flask import (
    Blueprint,
    Flask,
    flash,
    redirect,
    render_template,
    request,
    session,
    url_for,
)

bp = Blueprint("corona_total", __name__, url_prefix="/corona_total")

코로나 전체 데이터 뿌려주기
@bp.route('/', methods = ["GET", "POST"])
def corona_total_page():
    if request.method == "GET":
