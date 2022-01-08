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
    "접종일",
    "접종대상자",
    "당일 1차접종자 수",
    "1차접종 누계",
    "1차접종률(%)",
    "당일 2차접종자 수",
    "2차접종 누계",
    "2차접종률(%)",
    "당일 추가접종자 수",
    "추가접종 누계",
    "추가접종률(%)",
    "추가접종대상자",
]


def saveVaccinated():
    url = f"http://openAPI.seoul.go.kr:8088/{key}/xml/tvCorona19VaccinestatNew/1/8/"
    # print(key)
    response = requests.get(url)
    xmlString = response.content
    jsonString = json.dumps(xmltodict.parse(xmlString), indent=4, ensure_ascii=False)
    # print(jsonString)
    json_data = json.loads(jsonString)["tvCorona19VaccinestatNew"]["row"]
    # print(json_data)
    with open("./dataanalysis/data/서울특별시 코로나19 백신 예방접종 현황.csv", "w", encoding="euc-kr") as f:
        w = csv.writer(f)
        for i in range(len(fields)):
            if i == len(fields)-1:
                f.write("\"" + fields[i] + "\"")
            else:
                f.write("\"" + fields[i] + "\",")
        w.writerow("")
        for dic in json_data:
            row = []
            for s, value in dic.items():
                row.append(value)
            w.writerow(row)


# saveVaccinated()

# # "접종일","접종대상자","당일 1차접종자 수","1차접종 누계","1차접종률(%)","당일 2차접종자 수","2차접종 누계","2차접종률(%)","당일 추가접종자 수","추가접종 누계","추가접종률(%)","추가접종대상자"
