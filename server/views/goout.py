import json

from flask import Blueprint, request
from flask.wrappers import Response
from flask_cors import cross_origin
from sqlalchemy import or_

from models.goout import GoOut, GoOutReviews
from utility.todict import AlchemyEncoder
from api_requests import geocoding

bp = Blueprint("goout", __name__, url_prefix="/goout")


def get_goouts_by_filtering(region: str, cat1: str, cat2: str):
    if cat1 is None:
        return GoOut.query.filter(GoOut.region == region).all()
    elif cat2 is None:
        return GoOut.query.filter(GoOut.region == region)\
            .filter(GoOut.category == cat1).all()
    else:
        return GoOut.query.filter(GoOut.region == region)\
            .filter(or_(GoOut.category == cat1, GoOut.category == cat2)).all()


@bp.route('', methods=['POST'])
@cross_origin()
def get_goout():
    lat = request.json['lat']
    lng = request.json['lng']
    region = geocoding.getKoreanJCG(lat, lng)

    cat_1 = request.args.get('category1')
    cat_2 = request.args.get('category2')

    res = get_goouts_by_filtering(region, cat_1, cat_2)
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)

    return Response(res, mimetype="application/json")


@bp.route("/<int:goout_id>", methods=['GET'])
@cross_origin()
def get_goout_detail(goout_id: int):
    res = GoOut.query.filter(GoOut.id == goout_id).first()
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)

    return Response(res, mimetype="application/json")


@bp.route("/reviews/<int:goout_id>", methods=['GET'])
@cross_origin()
def get_goout_review(goout_id: int):
    goout = GoOut.query.filter(GoOut.id == goout_id).first()
    res = GoOutReviews.query.filter(GoOutReviews.store_name == goout.name).all()
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)

    return Response(res, mimetype="application/json")
