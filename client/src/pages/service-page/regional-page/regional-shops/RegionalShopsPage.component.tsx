import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackDrop from '../../../../components/UI/BackDrop/BackDrop.component';
/* import axios from 'axios'; */
import Loading from '../../../../components/UI/loading/Loading.component';
import RegionalShopDetail from '../regional-shops-detail/RegionalShopDetail.component';
// import useLoadShops from '../../../../hooks/useLoadShops.component';

import {
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
  ShopListContainer,
  FilterBtn,
  FilterBtnContainer,
  ShopContainer,
} from './RegionalShopsPage.styles';

const RegionalShopsPage: React.FC = () => {
  const [shopList, setShopList] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [selectShop, setSelectShop] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(
        'https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/restaurants/near'
      );
      const data = await res.data;
      setShopList(data);
    };
    fetchRestaurants();
  }, []);

  const handleToDetail = (e: any) => {
    setSelectShop(e.target.id);
    handleToggleDetail();
  };

  const handleToggleDetail = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const handleClickFilter = (e: any) => {
    if (e.target.id === 'review') {
      setShopList((prev) => [
        ...prev.sort((a, b) => b.review_avg - a.review_avg),
      ]);
    } else if (e.target.id === 'time') {
      setShopList((prev) => [
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
      {!shopList ? (
        <Loading />
      ) : (
        <>
          <FilterBtnContainer>
            <FilterBtn id='time' onClick={handleClickFilter}>
              빠른시간순
            </FilterBtn>
            <FilterBtn id='review' onClick={handleClickFilter}>
              높은평점순
            </FilterBtn>
          </FilterBtnContainer>
          <ShopListContainer>
            {isDetailOpen && <BackDrop onCancel={handleToggleDetail} />}
            {isDetailOpen && (
              <RegionalShopDetail
                shopData={shopList}
                selected={selectShop}
                onCancel={handleToggleDetail}
              />
            )}
            {shopList.map((item, idx) => (
              <ShopContainer
                key={idx}
                onClick={handleToDetail}
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
                  <b>평점</b>:{' '}
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

export default RegionalShopsPage;
