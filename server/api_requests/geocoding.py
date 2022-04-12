import importlib.util
import json

import requests

spec = importlib.util.spec_from_file_location("personalKey", "static/projectKeys/personalKey.py")
personalKey = importlib.util.module_from_spec(spec)
spec.loader.exec_module(personalKey)
geocodingKey = personalKey.geocodingKey


def getKoreanJCG(lat: float, lng: float):
    latlng = str(lat) + "," + str(lng)
    # latlng = "37.486106,127.089377"
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
    # print(ans)
    return ans
