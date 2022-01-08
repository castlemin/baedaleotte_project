import json

from flask import Blueprint, Flask, Response, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from flask_cors import cross_origin
from models.categories import Categories
from models.engkorjcg import EngKorJCG
from utility.todict import AlchemyEncoder

bp = Blueprint("categories", __name__, url_prefix="/categories")


@bp.route("/")
@cross_origin()
def getAllCategories():
    categories = Categories.query.all()
    res = json.dumps([x.category for x in categories], cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    # return res
    return Response(res, mimetype="application/json")
