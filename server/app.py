from fastapi import FastAPI, Query
from flask import Flask, jsonify

from db_connect import database, session_scope
from models.test_table import Daily_Corona


# from pymysql import
def create_app():
    # app = Flask(__name__)

    # app.database = database
    app = FastAPI()
    @app.get('/Daily_')
    return app
