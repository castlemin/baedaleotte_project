from db_connect import db
from sqlalchemy import Column, Date, Integer

class Restaurants_Info(db.Model):
    __tablename__ = 'Restaurants_Info'
    