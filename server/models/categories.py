from db_connect import db
from sqlalchemy import TEXT


class Categories(db.Model):
    __tablename__ = "Categories"
    category = db.Column(db.TEXT, nullable=False, primary_key=True)
