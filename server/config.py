import os

from static.projectKeys.personalKey import db_setting

BASE_DIR = os.path.dirname(__file__)
# print(BASE_DIR)
DB = db_setting
SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False
