import csv
import importlib.util
import json
import time
from datetime import datetime, timedelta

import pandas as pd
import requests
import sqlalchemy
import xmltodict

spec = importlib.util.spec_from_file_location("personalKey", "./static/projectKeys/personalKey.py")
personalKey = importlib.util.module_from_spec(spec)
spec.loader.exec_module(personalKey)


def translateSystemClock(userTime: datetime):
    year = str(userTime.year)
    if userTime.month < 10:
        month = "0" + str(userTime.month)
    else:
        month = str(userTime.month)
    if userTime.day < 10:
        day = "0" + str(userTime.day)
    else:
        day = str(userTime.day)
    return year + month + day


key = personalKey.SEOUL_OPEN_DATA_PERSONAL_KEY
fields = [
    "기준일ID",
    "시군구코드",
    "시군구명",
    "총생활인구수",
    "내국인생활인구수",
    "장기체류외국인인구수",
    "단기체류외국인인구수",
    "일최대인구수",
    "일최소인구수",
    "주간인구수(09~18)",
    "야간인구수(19~08)",
    "일최대이동인구수",
    "서울외유입인구수",
    "동일자치구행정동간이동인구수",
    "자치구간이동인구수",
]


def saveSeoulPopDailyAsCSV():
    tod = datetime.now()
    for d in range(6, 20):
        di = timedelta(days=d)
        targetday = tod - di
        target = translateSystemClock(targetday)
        print(target)

        url = f"http://openAPI.seoul.go.kr:8088/{key}/xml/SPOP_DAILYSUM_JACHI/1/26/{target}"
        # print(key)
        response = requests.get(url)
        xmlString = response.content
        jsonString = json.dumps(xmltodict.parse(xmlString), indent=4, ensure_ascii=False)
        # print(jsonString)
        json_data = json.loads(jsonString)["SPOP_DAILYSUM_JACHI"]["row"]
        # print(json_data)
        if d == 6:
            with open("./dataanalysis/data/자치구단위 서울생활인구 일별 집계표.csv", "w", encoding="euc-kr") as f:
                w = csv.writer(f)
                w.writerow(fields)
        with open("./dataanalysis/data/자치구단위 서울생활인구 일별 집계표.csv", "a", encoding="euc-kr") as f:
            w = csv.writer(f)
            for dic in json_data:
                row = []
                for s, value in dic.items():
                    row.append(value)
                w.writerow(row)


# # "접종일","접종대상자","당일 1차접종자 수","1차접종 누계","1차접종률(%)","당일 2차접종자 수","2차접종 누계","2차접종률(%)","당일 추가접종자 수","추가접종 누계","추가접종률(%)","추가접종대상자"
