import csv
import importlib.util
import json
import time

import pandas as pd
import requests
import sqlalchemy
import xmltodict

spec = importlib.util.spec_from_file_location("personalKey", "static/projectKeys/personalKey.py")
personalKey = importlib.util.module_from_spec(spec)
spec.loader.exec_module(personalKey)


def addLatestSeoulCoronaPatients():
    key = personalKey.SEOUL_OPEN_DATA_PERSONAL_KEY
    url = f"http://openAPI.seoul.go.kr:8088/{key}/xml/TbCorona19CountStatusJCG/1/5/"

    response = requests.get(url)
    xmlString = response.content
    jsonString = json.dumps(xmltodict.parse(xmlString), indent=4)
    json_data = json.loads(jsonString)["TbCorona19CountStatusJCG"]["row"]
    fields = []

    for dic in json_data:
        for key, value in dic.items():
            fields.append(key)
        break
    # print(json_data)
    with open("./static/corona_daily_data.csv", "w") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for dic in json_data:
            w.writerow(dic)

    DB = personalKey.db_setting
    DB_URI = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8mb4"
    engine = sqlalchemy.create_engine(DB_URI, echo=False)
    df = pd.read_csv("./static/corona_daily_data.csv", encoding="utf-8")
    df = df.head(1)
    df.to_sql(name="CoronaDaily", con=engine, if_exists="append", index=False)
    print(df)


# # addLatestSeoulCoronaPatients()
# sched = BackgroundScheduler()
# sched.start()

# # sched.add_job(addLatestSeoulCoronaPatients, "interval", second=5, id="test")
# sched.add_job(addLatestSeoulCoronaPatients, "cron", hour="00", minute="32", second="40", id="test_10")
