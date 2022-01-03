import json
import re

from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from flask.wrappers import Response
from haversine import haversine
from models.restaurants import RestaurantInfo
from utility.todict import AlchemyEncoder

bp = Blueprint("restaurants", __name__, url_prefix="/restaurants")


@bp.route("")
def getAllRestaurants():
    res_id = 510525
    restaurants = RestaurantInfo.query.filter(RestaurantInfo.restaurant_id == res_id).first()
    # print(restaurants.categories)
    res = json.dumps(restaurants, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json")


def restaurant_search(instances, user_location):
    res = []
    for restaurant in instances:
        restaurant_location = (float(restaurant.lat), float(restaurant.lng))
        dis = haversine(user_location, restaurant_location, unit="km")
        if dis < 1:
            res.append(restaurant)
    return res


@bp.route("/near")
def getNearRestaurants():
    user_location = (37.484410, 127.087437)
    # 37.484410, 127.087437
    cat_1 = request.args.get("category1", type=str)
    cat_2 = request.args.get("category2", type=str)

    if cat_1 is not None and cat_2 is None:
        restaurants = RestaurantInfo.query.filter(RestaurantInfo.categories.ilike(f"%{cat_1}%"))

    elif cat_1 is not None and cat_2 is not None:
        restaurants = RestaurantInfo.query.filter(
            RestaurantInfo.categories.ilike(f"%{cat_1}%") | RestaurantInfo.categories.ilike(f"%{cat_2}%")
        ).distinct()
    else:
        restaurants = RestaurantInfo.query.all()

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
    res = restaurant_search(lis, user_location)
    res = json.dumps(res, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json")


@bp.route("/<int:res_id>")
def getRestaurantDetail(res_id):
    res_id = 510525
    restaurant = RestaurantInfo.query.filter(RestaurantInfo.restaurant_id == res_id).first()
    res = json.dumps(restaurant, cls=AlchemyEncoder, ensure_ascii=False, indent=4)
    return Response(res, mimetype="application/json")


# @bp.route("/<int:res_id>/review")
