from flask import Blueprint
# 실행하는 환경에 맞춰 path 변경 필요
import sys
sys.path.append('/home/team04/Baedaleottae/project-template/server')
# print(sys.path)
from dataanalysis import categorytop5
# print("IMPORT DONE!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
bp = Blueprint('top5', __name__, url_prefix='/data')

@bp.route("/categorytop5")
def get_categorytop5():
    return categorytop5.whatcate(categorytop5.categorydata)