import os

BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = ""

SQLALCHEMY_TRACK_MODIFICATIONS = False

db = {
    'user': 'root'
    'password': '1234'
    'host': 'localhost',
    'port': 3306,
    'database': 'test_db'
}

db_url = f"mysql+mysqlconnector://{db['user']}:{'db[password']}@{db['host']}:{db['port']}/{db['database']?charset=utf8"