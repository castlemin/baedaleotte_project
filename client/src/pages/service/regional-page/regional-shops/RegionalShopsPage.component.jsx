import React, { useEffect, useState } from 'react';
/* import axios from 'axios'; */
import stores from '../../../../assets/data/food_dummy.json';
import { Card } from '../../../../components/UI/Card/Card.styles';
import Header from '../../../../components/UI/header/Header.component';
import Loading from '../../../../components/UI/loading/Loading.component';
import {
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
  ShopListContainer,
} from './RegionalShopsPage.styles';

const RegionalShopsPage = () => {
  const [storeList, setStoreList] = useState([]);

  const data = new Date();

  const WEEK_DAY = {
    Sun: '일요일',
    Mon: '월요일',
    Tue: '화요일',
    Wed: '수요일',
    Thu: '목요일',
    Fri: '금요일',
    Sat: '토요일',
  };

  const date = WEEK_DAY[data.toString().split(' ')[0]];

  useEffect(() => {
    setStoreList(stores);
  }, []);

  console.log(storeList);

  return (
    <>
      {!storeList ? (
        <Loading />
      ) : (
        <>
          <Header serviceStatic />
          <h1>오늘은 {date}, 인기메뉴는 </h1>
          <ShopListContainer>
            {storeList.map((item) => (
              <Card key={item.id} shop>
                <ShopDescContainer>
                  <b>카테고리</b>:{' '}
                  {item.categories.map((cat) => (
                    <li key={cat}>{cat}</li>
                  ))}
                  <br />
                  <b>영업시간</b>: {item.begin.slice(0, -3)}시 -{' '}
                  {item.end.slice(0, -3)}시
                  <br />
                  <b>평점</b>:{' '}
                  {item.review_avg === 0 ? '평점 없음' : item.review_avg}
                  <br />
                  <b>배달 소요시간</b>: {item.estimated_delivery_time}
                </ShopDescContainer>
                <ShopTitleContainer>{item.name}</ShopTitleContainer>
                <ShopImgContainer url={item.logo_url} />
              </Card>
            ))}
          </ShopListContainer>
        </>
      )}
    </>
  );
};

export default RegionalShopsPage;
