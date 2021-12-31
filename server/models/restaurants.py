from db_connect import db
from sqlalchemy import BIGINT, TEXT, Column, Date, Float


class RestaurantInfo(db.Model):
    __tablename__ = "RestaurantInfo"
    # id = db.Column(db.BIGINT, nullable=False, auto_increment=True, primary_key=True)
    restaurant_id = db.Column(db.BIGINT, nullable=False, primary_key=True)
    name = db.Column(db.TEXT(20), nullable=False)
    except_cash = db.Column(db.BIGINT)
    is_available_delivery = db.Column(db.BIGINT)
    is_available_pickup = db.Column(db.BIGINT)
    categories = db.Column(db.TEXT)
    tags = db.Column(db.TEXT)
    payment_methods = db.Column(db.TEXT)
    discount_percent = db.Column(db.BIGINT)
    restaurant_type = db.Column(db.TEXT(50))
    additional_discount = db.Column(db.BIGINT)
    review_avg = db.Column(db.Float)
    review_count = db.Column(db.BIGINT)
    franchise_id = db.Column(db.BIGINT)
    begin = db.Column(db.TEXT)
    end = db.Column(db.TEXT)
    lat = db.Column(db.TEXT(20))
    lng = db.Column(db.TEXT(20))
    new_rating = db.Column(db.Float)
    distance = db.Column(db.Float)
    min_order_amount = db.Column(db.Float)
    free_delivery_threshold = db.Column(db.Float)
    is_deliverable = db.Column(db.BIGINT)
    reason = db.Column(db.TEXT(50))
    owner_reply_count = db.Column(db.BIGINT)
    estimated_delivery_time = db.Column(db.TEXT(20))
    representative_menus = db.Column(db.TEXT)
    adjusted_delivery_fee = db.Column(db.BIGINT)
    delivery_method = db.Column(db.TEXT(20))
    section = db.Column(db.TEXT(20))
    section_pos = db.Column(db.BIGINT)
    list_pos = db.Column(db.BIGINT)
    phone = db.Column(db.TEXT(30))
    address = db.Column(db.TEXT(200))
    logo_url = db.Column(db.TEXT(200))
    thumbnail_url = db.Column(db.TEXT(200))
    reachable = db.Column(db.BIGINT)
    minimum_pickup_minutes = db.Column(db.TEXT(20))
    franchise_name = db.Column(db.TEXT(20))
    discount_from = db.Column(db.TEXT(20))
    discount_until = db.Column(db.TEXT(20))
    thumbnail_message = db.Column(db.TEXT(200))
    delivery_fee_to_display = db.Column(db.TEXT)
