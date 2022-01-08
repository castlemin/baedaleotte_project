import json
import re

from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from flask.wrappers import Response
from flask_cors import cross_origin
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from haversine import haversine
from models.restaurants import RestaurantInfo
from utility.todict import AlchemyEncoder
from flask_cors import cross_origin
import sys
bp = Blueprint("restaurants", __name__, url_prefix="/restaurants")

sys.path.append("/home/team04/Baedaleottae/project-template/server")
from static.projectKeys.personalKey import db_setting


DB = db_setting
DB_URI = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8mb4"

engine = create_engine(DB_URI, echo=False)
Session = sessionmaker(engine, autoflush = False)
session = Session()


@bp.route("/")
@cross_origin()
def getAllRestaurants():
    restaurants = RestaurantInfo.query.all()
    res = json.dumps(restaurants, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json", indent=4)


def restaurant_search(instances: RestaurantInfo, user_location):
    near_restaurants = []
    for restaurant in instances:
        restaurant_location = (restaurant.lat, restaurant.lng)
        dis = haversine(user_location, restaurant_location, unit="km")
        if dis < 1:
            near_restaurants.append(restaurant)
    return near_restaurants


def get_restaurants_by_categories(cat1: str, cat2: str):
    if cat1 is None:
        return RestaurantInfo.query.all()
    elif cat2 is None:
        return RestaurantInfo.query.filter(RestaurantInfo.categories.ilike(f"%{cat1}"))
    else:
        return RestaurantInfo.query.filter(
            RestaurantInfo.categories.ilike(f"%{cat1}") | RestaurantInfo.categories.ilike(f"%{cat2}")
        ).distinct()


def preprocess_restaurants_list(restaurants):
    lis = []
    for restaurant in restaurants:
        line = re.split(" ", restaurant['categories'])
        payments = re.split(" ", restaurant['payment_methods'])

        categories = []
        payment_method = []
        for category in line:
            category1 = category.replace("[", "").replace("]", "").replace(",", "").strip("'")
            categories.append(category1)
        for payment in payments:
            payment1 = payment.replace("[", "").replace("]", "").replace(",", "").strip("'")
            payment_method.append(payment1)
        restaurant["payment_methods"] = payment_method
        restaurant["categories"] = categories
        lis.append(restaurant)
    return lis


@bp.route("/near", methods=["POST"])
def getNearRestaurants():
    with session.no_autoflush:
        lat = request.json["lat"]
        lng = request.json["lng"]
        cat_1 = request.args.get("category1", type=str)
        cat_2 = request.args.get("category2", type=str)
        if cat_1 is None and cat_2 is None:
            restaurants = RestaurantInfo.query.all()
        else:
            restaurants = get_restaurants_by_categories(cat_1, cat_2)
        res = restaurant_search(restaurants, (lat, lng))
        res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
        
        res = preprocess_restaurants_list(json.loads(res))
        return Response(json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4), mimetype="application/json")
    # curl -d '{"lat":37.39692,"lng":126.984646}' -H "Content-Type: application/json" -X POST "http://127.0.0.1:8000/restaurants/near"

@bp.route("/<int:res_id>")
@cross_origin()
def getRestaurantDetail(res_id: int):
    restaurant = RestaurantInfo.query.filter(RestaurantInfo.restaurant_id == res_id).first()  # noqa: E501
    res = json.dumps(restaurant, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json")
