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
    restaurants = RestaurantInfo.query.filter(RestaurantInfo.restaurant_id == 510525).first()
    # print(restaurants.categories)
    res = json.dumps(restaurants, cls=AlchemyEncoder, ensure_ascii=False)
    return Response(res, mimetype="application/json")


# return Response(json.dumps( 변수), mimetype='application/json')


@bp.route("/near")
def getNearRestaurants():
    user_location = (37.484410, 127.087437)
    # 37.484410, 127.087437
    restaurants = RestaurantInfo.query.all()
    lis = []
    for restaurant in restaurants:
        restaurant_location = (restaurant.lat, restaurant.lng)
        dis = haversine(user_location, restaurant_location, unit="km")
        if dis < 1:
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
    res = json.dumps(lis, cls=AlchemyEncoder, ensure_ascii=False)
    return Response(res, mimetype="application/json")


# for row in categories:
#     line = re.split(" ",row)
#     for category in line:
#         category = category.replace("[","").replace("]","").replace(",","").strip("'")
#         if category not in filtered_categories and category != "":
#             filtered_categories.append(category)
