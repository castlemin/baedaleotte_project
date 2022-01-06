import pandas as pd
import sqlalchemy
from static.projectKeys.personalKey import db_setting


DB = db_setting
DB_URI = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8mb4"

engine = sqlalchemy.create_engine(DB_URI, echo=False)

food_type_to_category = {
    '이탈리안' : '양식',
    '이자카야 / 오뎅 / 꼬치' : '일식',
    '해산물 요리' : '한식',
    '회 / 스시' : '일식',
    '프랑스 음식' : "세계음식",
    "정통 일식 / 일반 일식" : "일식",
    "인도 음식" : "세계음식",
    "카페 / 디저트" : "카페",
    "고기 요리" : "한식",
    "정통 중식 / 일반 중식" : "중식",
    "탕 / 찌개 / 전골" : "한식",
    "한정식 / 백반 / 정통 한식" : "한식",
    "브런치 / 버거 / 샌드위치" : "양식",
    "태국 음식" : "세계음식",
    "기타 양식" : "양식",
    "베이커리" : "카페",
    "기타 일식" : "일식",
    "국수 / 면 요리" : "한식",
    "베트남 음식" : "세계음식",
    "세계음식 기타" : "세계음식",
    "까스 요리" : "일식",
    "퓨전 양식" : "양식",
    "칵테일 / 와인" : "주점",
    "다국적 퓨전" : "세계음식",
    "돈부리 / 일본 카레 / 벤토" : "일식",
    "다국적 아시아 음식" : "세계음식",
    "퓨전 한식" : "한식",
    "남미 음식" : "세계음식",
    "스테이크 / 바베큐" : "양식",
    "딤섬 / 만두" : "중식",
    "닭 / 오리 요리" : "한식",
    "패밀리 레스토랑" : "양식",
    "라멘 / 소바 / 우동" : "일식",
    "기타 중식" : "중식",
    "퓨전 일식" : "일식",
    "전통 주점 / 포차" : "주점",
    "기타 한식" : "한식",
    "치킨 / 호프 / 펍" : "주점",
    "일반 주점" : "주점",
    "철판 요리" : "세계음식",
    "뷔페" : "세계음식",
    "퓨전 중식" : "중식",
    "시푸드 요리" : "세계음식"
}


df_store = pd.read_csv('./static/store_info_encoded.csv', encoding='utf-8')

df_reviews = pd.read_csv('./static/store_reviews_encoded.csv', encoding='utf-8')

list_food_type = df_store['food_type'].tolist()
list_category = [food_type_to_category[food_type] for food_type in list_food_type]

df_store['category'] = list_category


df_store.to_sql(name="goout", con=engine, if_exists='replace', index=False)
df_reviews.to_sql(name="goout_reviews", con=engine, if_exists='replace', index=False)
