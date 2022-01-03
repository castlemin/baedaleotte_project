import json

import requests
from typing_extensions import ParamSpec

from personalKey import geocodingKey


def getKoreanJCG(lat, lng):
    latlng = str(lat) + "," + str(lng)
    BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PARRAMS = {
        "latlng": latlng,
        "language": "ko",
        "key": geocodingKey,
    }

    res = requests.get(BASE_URL, params=PARRAMS).json()
    flag = False
    ans = ""
    for d in res["results"]:
        for gu in d["formatted_address"].split():
            if gu.endswith("구"):
                ans += gu
                flag = True
                break
        if flag:
            break
    return ans
