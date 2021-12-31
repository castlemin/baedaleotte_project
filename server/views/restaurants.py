import json

from flask import Blueprint, Flask, flash, redirect, render_template, request, session, url_for
from flask.json import jsonify
from haversine import haversine
from models.restaurants import Restaurant_Info
from utility.todict import AlchemyEncoder

bp = Blueprint("restaurants", __name__, url_prefix="/restaurants")


@bp.route("/")
def getAllRestaurants():
    restaurants = Restaurant_Info.query.filter(Restaurant_Info.restaurant_id == 510525).first()
    # print(restaurants.categories)
    res = json.dumps(restaurants, cls=AlchemyEncoder, ensure_ascii=False)
    return res


@bp.route("/near")
def getNearRestaurants():
    user_location = (37.484410, 127.087437)
    # 37.484410, 127.087437
    restaurants = Restaurant_Info.query.all()
    lis = {}
    for restaurant in restaurants:
        restaurant_location = (restaurant.lat, restaurant.lng)
        dis = haversine(user_location, restaurant_location, unit="km")
        cnt = 0
        if dis < 1:
            cnt += 1
            lis[cnt] = json.dumps(restaurant, cls=AlchemyEncoder, ensure_ascii=False)

    return lis
