import axios from 'axios';
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

const RegionalShopsPage: React.FC = () => {
  const [storeList, setStoreList] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(
        'https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/restaurants/near'
      );
      const data = await res.data;
      setStoreList(data);
    };
    fetchRestaurants();
  }, []);

  console.log(storeList);

  return (
    <>
      {!storeList ? (
        <Loading />
      ) : (
        <>
          <Header serviceStatic />
          <ShopListContainer>
            {storeList.map((item) => (
              <Card key={item.id} shop>
                <ShopDescContainer>
                  <b>카테고리</b>:{' '}
                  {item.categories.map((cat: string[]) => (
                    <li>{cat}</li>
                  ))}
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
