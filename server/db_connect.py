from typing import ContextManager

import pymysql
from sqlalchemy.engine import create_engine
from sqlalchemy.orm.session import sessionmaker

from personalKey import db_setting

# db = pymysql.connect(
#     host=db_setting["host"],
#     port=db_setting["port"],
#     user=db_setting["user"],
#     passwd=db_setting["password"],
#     db=db_setting["database"],
#     charset="utf8",
# )
DB = db_setting
DB_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"

Session = sessionmaker()
database = create_engine(DB_URL, encoding="utf-8", max_overflow=0)


@ContextManager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
