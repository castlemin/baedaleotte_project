import sqlalchemy
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import text

import config

# from models.test_table import Daily_Corona
from personalKey import db_setting, secretKey
from views import corona_total

# from db_connect import db


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    app.secret_key = secretKey
    app.config["SESSION_TYPE"] = "filesystem"
    db.init_app(app)
    Migrate().init_app(app, db)
    app.register_blueprint(corona_total.bp)
    return app


# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
