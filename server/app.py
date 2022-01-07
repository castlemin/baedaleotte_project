from datetime import datetime

import sentry_sdk
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sentry_sdk.integrations.flask import FlaskIntegration

import config
from static.projectKeys.personalKey import db_setting, secretKey, sentry_dsn

from views import categories, corona_total, restaurants, review, goout, graph
# top5 는 시간/요일별 인기 카테고리 top5를 위한 bp입니다.
#from views import categories, corona_total, restaurants, review, goout, graph, top5

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    sentry_sdk.init(
        dsn=sentry_dsn,
        integrations=[FlaskIntegration()],
    )
    app.config.from_object(config)
    app.secret_key = secretKey
    app.config["SESSION_TYPE"] = "filesystem"
    db.init_app(app)
    Migrate().init_app(app, db)

    app.register_blueprint(corona_total.bp)
    app.register_blueprint(restaurants.bp)
    app.register_blueprint(categories.bp)
    app.register_blueprint(review.bp)
    app.register_blueprint(graph.bp)
    #app.register_blueprint(top5.bp)
    app.register_blueprint(goout.bp)

    # @app.errorhandler(404)

    return app


# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
