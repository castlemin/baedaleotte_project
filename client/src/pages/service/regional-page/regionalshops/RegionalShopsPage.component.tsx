import React, { useEffect, useState } from 'react';
/* import axios from 'axios'; */
import stores from '../../../../assets/data/food_dummy.json';
import { Card } from '../../../../components/UI/Card/Card.styles';
import {
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
  ShopListContainer,
} from './RegionalShopsPage.styles';

const RegionalShopsPage: React.FC = () => {
  const [storeList, setStoreList] = useState<any[]>([]);

  useEffect(() => {
    setStoreList(stores);
  }, []);

  console.log(storeList);

  return (
    <ShopListContainer>
      {storeList.map((item) => (
        <Card key={item.id} shop>
          <ShopDescContainer>
            영업시간:{' '}
            {item.thumbnail_message === null
              ? '영업 정보가 없습니다'
              : item.thumbnail_message}
          </ShopDescContainer>
          <ShopTitleContainer key={item.id}>{item.name}</ShopTitleContainer>
          <ShopImgContainer key={item.id} url={item.logo_url} />
        </Card>
      ))}
    </ShopListContainer>
  );
};

export default RegionalShopsPage;
