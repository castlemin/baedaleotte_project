import pandas as pd
import sqlalchemy
from personalKey import db_setting

DB = db_setting
DB_URI = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8mb4"

engine = sqlalchemy.create_engine(DB_URI, echo=False)

df = pd.read_csv('./static/corona_daily_data.csv', encoding='utf-8')

df.to_sql(name="CoronaDaily".lower(), con=engine, if_exists='replace', index=False)

df_2 = pd.read_csv('./static/eng_kor_jcg.csv', encoding='utf-8')

df_2.to_sql(name="EngKorJCG".lower(), con=engine, if_exists='replace', index=False)

df_3 = pd.read_csv('./static/restaurants copy.csv', encoding='utf-8')
df_3 = df_3[["restaurant_id",
             "name",
             "categories",
             "review_avg",
             "review_count",
             "estimated_delivery_time",
             "address",
             "min_order_amount",
             "phone",
             "begin",
             "end",
             "lat",
             "lng",
             "logo_url",
             "payment_methods"]]

df_3.to_sql(name="RestaurantInfo".lower(), con=engine, if_exists='replace', index=False)
