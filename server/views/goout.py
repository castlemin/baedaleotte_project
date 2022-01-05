import json
import re

from flask import Blueprint, request
from flask.wrappers import Response
from models.goout import GoOut, GoOutReviews
from utility.todict import AlchemyEncoder
from api_requests import geocoding

bp = Blueprint("goout", __name__, url_prefix="/goout")


def get_goouts_by_categories(cat1: str, cat2: str):
    if cat1 is None:
        return GoOut.query.all()
    elif cat2 is None:
        return GoOut.query.filter(GoOut.categories.ilike(f"%{cat1}"))
    else:
        return GoOut.query.filter(
            GoOut.categories.ilike(f"%{cat1}") | GoOut.categories.ilike(f"%{cat2}")
        ).distinct()


@bp.route('', methods=['POST'])
def get_goout():
    lat = float(request.form['lat'])
    lng = float(request.form['lng'])
    region = geocoding.getKoreanJCG(lat, lng)

    cat_1 = request.args.get('category1')
    cat_2 = request.args.get('category2')

    res = get_goouts_by_categories(cat_1, cat_2)
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)

    return Response(res, mimetype="application/json")


@bp.route("/<int:goout_id>", methods=['GET'])
def get_goout_detail(goout_id: int):
    res = GoOut.query.filter(GoOut.id == goout_id).first()
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)

    return Response(res, mimetype="application/json")


@bp.route("/review/<int:goout_id", methods=['GET'])
def get_goout_review(goout_id: int):
    res = GoOutReviews.query.filter(GoOutReviews.goout_id == goout_id).all()
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)

    return Response(res, mimetype="application/json")
