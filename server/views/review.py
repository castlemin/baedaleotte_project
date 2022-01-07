import json

from flask import Blueprint, Response

# from flask_sqlalchemy import *
from models.restaurants import Reviews
from utility.todict import AlchemyEncoder

bp = Blueprint("review", __name__, url_prefix="/review")


@bp.route("/<int:id>")
def review(id: int):
    reviews = Reviews.query.filter(Reviews.store_id == id).all()
    res = json.dumps(reviews, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json")
