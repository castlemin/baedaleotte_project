from datetime import datetime
import pandas as pd

categorydata = pd.read_csv('./dataanalysis/data/카테고리데이터.csv')
#카테고리 top5 리턴하는 함수
def whatcate(data):
    요일 = datetime.today().weekday()
    시간대 = datetime.now().hour
    weekday = {0:'월요일', 1:'화요일', 2:'수요일', 3:'목요일', 4:'금요일', 5:'토요일', 6:'일요일'}
    categorytop5 = ', '.join(data[(data['요일']==weekday[요일])&(data['시간대']==시간대)][:5]['카테고리'])
    return categorytop5

whatcate(categorydata) #['치킨', '한식', '족발보쌈', '카페디저트', '분식']
print('categorytop5 is done')