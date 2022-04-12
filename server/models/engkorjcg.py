from db_connect import db
from sqlalchemy import TEXT, Column


class EngKorJCG(db.Model):
    __tablename__ = "EngKorJCG"
    eng = db.Column(db.TEXT, nullable=False, primary_key=True)
    kor = db.Column(db.TEXT, nullable=False)
    engadd = db.Column(db.TEXT, nullable=False)
    koradd = db.Column(db.TEXT, nullable=False)
