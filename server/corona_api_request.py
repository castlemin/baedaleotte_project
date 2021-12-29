import csv
import json

import requests
import xmltodict

from personalKey import SEOUL_OPEN_DATA_PERSONAL_KEY

key = SEOUL_OPEN_DATA_PERSONAL_KEY
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
with open("./static/corona_daily_data.csv", "w") as f:
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader()
    for dic in json_data:
        w.writerow(dic)
