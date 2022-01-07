import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { eatoutCategories } from '../../../../../../assets/data/eatoutCategories';
import { FOOD_DELIVERY_LIST_URL } from '../../../../../../assets/data/requestUrls';

import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
/* import axios from 'axios'; */
import Loading from '../../../../../../components/UI/loading/Loading.component';
import { selectedDeliveryCategory } from '../../../../../../store/store';
import RegionalDeliveryShopDetail from '../delivery-shops-detail/RegionalDeliveryShopDetail.component';
// import useLoadShops from '../../../../hooks/useLoadShops.component';

import {
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
  ShopListContainer,
  SortButtonContainer,
  ShopContainer,
  SortButton,
} from './RegionalDeliveryShopsPage.styles';

const RegionalDeliveryShopsPage: React.FC = () => {
  const [deliveryShopList, setDeliveryShopList] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [selectShop, setSelectDeliveryShop] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const chosenDeliveryCategories = useRecoilValue(selectedDeliveryCategory);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(FOOD_DELIVERY_LIST_URL);
      const data = await res.data;
      const filteredData = await data.filter((item: any) =>
        item.categories.includes(
          chosenDeliveryCategories[0] || chosenDeliveryCategories[1]
        )
      );
      setDeliveryShopList(filteredData);
    };
    fetchRestaurants();
  }, []);

  console.log(deliveryShopList);

  const handleToDeliveryDetail = (event: any) => {
    setSelectDeliveryShop(event.target.id);
    handleToggleDetail();
    console.log(selectShop);
  };

  const handleToggleDetail = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const handleClickSort = (event: any) => {
    if (event.target.className === 'review') {
      setDeliveryShopList((prev) => [
        ...prev.sort((a, b) => b.review_avg - a.review_avg),
      ]);
    } else if (event.target.id === 'time') {
      setDeliveryShopList((prev) => [
        ...prev.sort(
          (a, b) =>
            parseInt(a.estimated_delivery_time.slice(3, -1)) -
            parseInt(b.estimated_delivery_time.slice(3, -1))
        ),
      ]);
    }
  };

  return (
    <>
      {!deliveryShopList ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <h2>
              선택하신{' '}
              {chosenDeliveryCategories.map((item) => (
                <span>[{item}]</span>
              ))}
              에 대한 추천 결과입니다.
            </h2>
            <SortButtonContainer>
              <SortButton id='time' onClick={handleClickSort}>
                빠른시간순
              </SortButton>
              <SortButton id='review' onClick={handleClickSort}>
                높은평점순
              </SortButton>
            </SortButtonContainer>
          </div>
          <ShopListContainer layout={deliveryShopList.length}>
            {isDetailOpen && <BackDrop onCancel={handleToggleDetail} />}
            {isDetailOpen && (
              <RegionalDeliveryShopDetail
                shopData={deliveryShopList}
                selected={selectShop}
                onCancel={handleToggleDetail}
              />
            )}
            {deliveryShopList.map((item, idx) => (
              <ShopContainer
                key={idx}
                onClick={handleToDeliveryDetail}
                id={item.restaurant_id}
              >
                <ShopImgContainer id={item.restaurant_id} url={item.logo_url} />
                <ShopTitleContainer id={item.restaurant_id}>
                  {item.name}
                </ShopTitleContainer>
                <ShopDescContainer id={item.restaurant_id}>
                  <b>카테고리</b>:{' '}
                  {item.categories.map((cat: string[]) => (
                    <li id={item.restaurant_id}>{cat}</li>
                  ))}
                  <b>영업시간</b>: {item.begin.slice(0, -3)}시 -{' '}
                  {item.end.slice(0, -3)}시
                  <br />
                  <b>평균평점</b>:{' '}
                  {item.review_avg === 0 ? '평점 없음' : `${item.review_avg}점`}
                  <br />
                  <b>배달 소요시간</b>: {item.estimated_delivery_time}
                </ShopDescContainer>
              </ShopContainer>
            ))}
          </ShopListContainer>
        </>
      )}
    </>
  );
};

export default RegionalDeliveryShopsPage;
