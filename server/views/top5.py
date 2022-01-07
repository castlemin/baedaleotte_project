from flask import Blueprint

# 실행하는 환경에 맞춰 path 변경 필요
from dataanalysis.data import categorytop5

top5 = Blueprint('top5', __name__, url_prefix='/data')

@top5.route("./dataanalysis/categorytop5")
def get_categorytop5():
    return categorytop5.whatcate(categorytop5.categorydata)