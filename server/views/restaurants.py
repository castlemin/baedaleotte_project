import json
import re

from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from flask.wrappers import Response
from haversine import haversine
from models.restaurants import RestaurantInfo
from utility.todict import AlchemyEncoder

bp = Blueprint("restaurants", __name__, url_prefix="/restaurants")


@bp.route("/")
def getAllRestaurants():
    restaurants = RestaurantInfo.query.all()
    res = json.dumps(restaurants, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json", status=200)


def restaurant_search(instances: RestaurantInfo, user_location):
    res = []
    for restaurant in instances:
        restaurant_location = (float(restaurant.lat), float(restaurant.lng))
        dis = haversine(user_location, restaurant_location, unit="km")
        if dis < 1:
            res.append(restaurant)
    return res


def get_restaurants_by_categories(cat1: str, cat2: str):
    if cat1 is None:
        return RestaurantInfo.query.all()
    elif cat2 is None:
        return RestaurantInfo.query.filter(RestaurantInfo.categories.ilike(f"%{cat1}"))
    else:
        return RestaurantInfo.query.filter(
            RestaurantInfo.categories.ilike(f"%{cat1}") | RestaurantInfo.categories.ilike(f"%{cat2}")
        ).distinct()


def preprocess_restaurants_list(restaurants: RestaurantInfo):
    lis = []
    for restaurant in restaurants:
        line = re.split(" ", restaurant.categories)
        payment_methods = re.split(" ", restaurant.payment_methods)

        categories = []
        payment_method = []
        for category in line:
            category = category.replace("[", "").replace("]", "").replace(",", "").strip("'")
            categories.append(category)
        for payment in payment_methods:
            payment = payment.replace("[", "").replace("]", "").replace(",", "").strip("'")
            payment_method.append(payment)
        restaurant.payment_methods = payment_method
        restaurant.categories = categories
        lis.append(restaurant)
    return lis


@bp.route("/near", methods=["POST"])
def getNearRestaurants():
    lat = float(request.form["lat"])
    lng = float(request.form["lng"])
    user_location = (lat, lng)
    # 37.484410, 127.087437
    cat_1 = request.args.get("category1", type=str)
    cat_2 = request.args.get("category2", type=str)

    restaurants = get_restaurants_by_categories(cat_1, cat_2)

    lis = preprocess_restaurants_list(restaurants)

    res = restaurant_search(lis, user_location)
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json", status=200)


@bp.route("/<int:res_id>")
def getRestaurantDetail(res_id: int):
    # flag = False
    # try:
    #     if res_id is None:
    #         flag = True
    #         raise ValueError("입력값이 없습니다.")
    #     if type(res_id) is not int:
    #         flag = True
    #         raise ValueError("정확한 식당번호를 입력해 주시기 바랍니다.")
    #     res_ids = RestaurantInfo.query.with_entities(RestaurantInfo.restaurant_id).all()# noqa: E501
    #     if (res_id,) not in res_ids:
    #         flag = True
    #         raise ValueError("식당 번호를 찾을수 없습니다.")
    #     if flag == False:
    restaurant = RestaurantInfo.query.filter(RestaurantInfo.restaurant_id == res_id).first()  # noqa: E501
    res = json.dumps(restaurant, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json", status=200)
    # except ValueError as e:
    #     return Response(jsonify({"result": e, "status": 400}))
