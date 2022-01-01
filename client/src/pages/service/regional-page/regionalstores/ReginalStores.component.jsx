import React, { useEffect, useState } from 'react';
import axios from 'axios';
import stores from '../../../../assets/data/food_dummy.json';
import { Card } from '../../../../components/UI/Card/Card.styles';

const RegionStores = () => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    setStoreList(stores);
  }, []);

  console.log(storeList);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
      {storeList.map((item) => (
        <Card
          key={item.id}
          style={{
            backgroundImage: `url(https://www.yogiyo.co.kr/${item.logo_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <li key={item.id} style={{ listStyle: 'none' }}>
            {item.name}
          </li>
        </Card>
      ))}
    </div>
  );
};

export default RegionStores;
