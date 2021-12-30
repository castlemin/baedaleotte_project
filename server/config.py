import os

from personalKey import db_setting

BASE_DIR = os.path.dirname(__file__)

DB = db_setting
SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False
