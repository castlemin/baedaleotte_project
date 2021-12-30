# import pymysql
# from sqlalchemy.ext.declarative import declarative_base
from db_connect import db
from sqlalchemy import Column, Date, Integer


class Corona_Daily(db.Model):
    __tablename__ = "Corona_Daily"
    JCG_DT = db.Column(db.Date, nullable=False, primary_key=True)
    JONGNO = db.Column(db.Integer, nullable=False)
    JONGNOADD = db.Column(db.Integer, nullable=False)
    JUNGGU = db.Column(db.Integer, nullable=False)
    JUNGGUADD = db.Column(db.Integer, nullable=False)
    YONGSAN = db.Column(db.Integer, nullable=False)
    YONGSANADD = db.Column(db.Integer, nullable=False)
    SEONGDONG = db.Column(db.Integer, nullable=False)
    SEONGDONGADD = db.Column(db.Integer, nullable=False)
    GWANGJIN = db.Column(db.Integer, nullable=False)
    GWANGJINADD = db.Column(db.Integer, nullable=False)
    DDM = db.Column(db.Integer, nullable=False)
    DDMADD = db.Column(db.Integer, nullable=False)
    JUNGNANG = db.Column(db.Integer, nullable=False)
    JUNGNANGADD = db.Column(db.Integer, nullable=False)
    SEONGBUK = db.Column(db.Integer, nullable=False)
    SEONGBUKADD = db.Column(db.Integer, nullable=False)
    GANGBUK = db.Column(db.Integer, nullable=False)
    GANGBUKADD = db.Column(db.Integer, nullable=False)
    DOBONG = db.Column(db.Integer, nullable=False)
    DOBONGADD = db.Column(db.Integer, nullable=False)
    NOWON = db.Column(db.Integer, nullable=False)
    NOWONADD = db.Column(db.Integer, nullable=False)
    EP = db.Column(db.Integer, nullable=False)
    EPADD = db.Column(db.Integer, nullable=False)
    SDM = db.Column(db.Integer, nullable=False)
    SDMADD = db.Column(db.Integer, nullable=False)
    MAPO = db.Column(db.Integer, nullable=False)
    MAPOADD = db.Column(db.Integer, nullable=False)
    YANGCHEON = db.Column(db.Integer, nullable=False)
    YANGCHEONADD = db.Column(db.Integer, nullable=False)
    GANGSEO = db.Column(db.Integer, nullable=False)
    GANGSEOADD = db.Column(db.Integer, nullable=False)
    GURO = db.Column(db.Integer, nullable=False)
    GUROADD = db.Column(db.Integer, nullable=False)
    GEUMCHEON = db.Column(db.Integer, nullable=False)
    GEUMCHEONADD = db.Column(db.Integer, nullable=False)
    YDP = db.Column(db.Integer, nullable=False)
    YDPADD = db.Column(db.Integer, nullable=False)
    DONGJAK = db.Column(db.Integer, nullable=False)
    DONGJAKADD = db.Column(db.Integer, nullable=False)
    GWANAK = db.Column(db.Integer, nullable=False)
    GWANAKADD = db.Column(db.Integer, nullable=False)
    SEOCHO = db.Column(db.Integer, nullable=False)
    SEOCHOADD = db.Column(db.Integer, nullable=False)
    GANGNAM = db.Column(db.Integer, nullable=False)
    GANGNAMADD = db.Column(db.Integer, nullable=False)
    SONGPA = db.Column(db.Integer, nullable=False)
    SONGPAADD = db.Column(db.Integer, nullable=False)
    GANGDONG = db.Column(db.Integer, nullable=False)
    GANGDONGADD = db.Column(db.Integer, nullable=False)
    ETC = db.Column(db.Integer, nullable=False)
    ETCADD = db.Column(db.Integer, nullable=False)


class test_table(db.Model):
    __tablename__ = "test_table"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(10), nullable=False)
