from db_connect import db
from sqlalchemy import BIGINT, TEXT, Column, Date, Float


class GoOut(db.Model):
    __tablename__ = "goout"
    id = db.Column(db.BIGINT, nullable=False, primary_key=True)
    name = db.Column(db.TEXT(20), nullable=False)
    categories = db.Column(db.TEXT)
    region = db.Column(db.TEXT)
    rating = db.Column(db.Float)
    address = db.Column(db.TEXT)
    phone = db.Column(db.TEXT)
    price = db.Column(db.TEXT)
    hour = db.Column(db.TEXT)
    parking = db.Column(db.TEXT)

    img_url_1 = db.Column(db.TEXT)
    img_url_2 = db.Column(db.TEXT)
    img_url_3 = db.Column(db.TEXT)


class GoOutReviews(db.Model):
    __tablename__ = "goout_reviews"
    id = db.Column(db.BIGINT, nullable=False, primary_key=True)
    goout_id = db.Column(db.BIGINT, db.ForeignKey("GoOut.id", ondelete="CASCADE"))
    review_1 = db.Column(db.TEXT)
    review_2 = db.Column(db.TEXT)
    review_3 = db.Column(db.TEXT)