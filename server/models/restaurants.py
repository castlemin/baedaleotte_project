from db_connect import db
from sqlalchemy import BIGINT, TEXT, Column, Date, Float


class RestaurantInfo(db.Model):
    __tablename__ = "RestaurantInfo"
    restaurant_id = db.Column(db.BIGINT, nullable=False, primary_key=True)
    name = db.Column(db.TEXT(20), nullable=False)
    categories = db.Column(db.TEXT)
    payment_methods = db.Column(db.TEXT)
    review_avg = db.Column(db.Float)
    review_count = db.Column(db.BIGINT)
    begin = db.Column(db.TEXT)
    end = db.Column(db.TEXT)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    min_order_amount = db.Column(db.Float)
    estimated_delivery_time = db.Column(db.TEXT(20))
    phone = db.Column(db.TEXT(30))
    address = db.Column(db.TEXT(200))
    logo_url = db.Column(db.TEXT(200))


class Reviews(db.Model):
    __tablename__ = "reviews"
    row_num = db.Column(db.BIGINT, nullable=False, primary_key=True)
    store_id = db.Column(db.BIGINT, db.ForeignKey("RestaurantInfo.restaurant_id", ondelete="CASCADE"))
    comment = db.Column(db.TEXT, nullable=True)
    rating = db.Column(db.Float, nullable=False)
    time = db.Column(db.TEXT, nullable=False)
