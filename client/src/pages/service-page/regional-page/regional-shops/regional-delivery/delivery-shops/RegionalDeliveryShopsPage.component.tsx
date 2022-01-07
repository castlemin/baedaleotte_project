import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
/* import axios from 'axios'; */
import Loading from '../../../../../../components/UI/loading/Loading.component';
import RegionalShopDetail from '../delivery-shops-detail/RegionalDeliveryShopDetail.component';
import { selectedDeliveryCategory } from '../../../../../../store/store';
// import useLoadShops from '../../../../hooks/useLoadShops.component';

import {
  HeadingContainer,
  CategoryIndicator,
  CategoryNameContainer,
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
  ShopListContainer,
  SortButtonContainer,
  ShopContainer,
  SortButton,
} from './RegionalDeliveryShopsPage.styles';

const RegionalDeliveryShopsPage = () => {
  const chosenDeliveryCategories = useRecoilValue(selectedDeliveryCategory);

  const [selectShop, setSelectDeliveryShop] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [deliveryShopList, setDeliveryShopList] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(
        'https://bf13481e-d0b7-4fc0-a3d3-05a66db58f51.mock.pstmn.io/restaurants/near'
      );
      const data = await res.data;
      const filteredData = await data.filter(
        (item: any) =>
          item.categories.includes(chosenDeliveryCategories[0]) ||
          item.categories.includes(chosenDeliveryCategories[1])
      );
      setDeliveryShopList(filteredData);
    };
    fetchRestaurants();
  }, []);

  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const lastIdx = currentPage * postPerPage;

  const limitNumOfItems = (items: any[]) => {
    let currentItems;
    currentItems = items.slice(0, lastIdx);
    return currentItems;
  };

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentPage((prev) => prev + 1);

    setIsLoaded(false);
  };
  const onIntersect = async ([entry]: any, observer: any): Promise<any> => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };
  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

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
    if (event.target.id === 'review') {
      setDeliveryShopList((prev: any) => [
        ...prev.sort((a: any, b: any) => b.review_avg - a.review_avg),
      ]);
    } else if (event.target.id === 'time') {
      setDeliveryShopList((prev: any) => [
        ...prev.sort(
          (a: any, b: any) =>
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
          <HeadingContainer>
            <CategoryIndicator>
              선택하신{' '}
              {chosenDeliveryCategories.map((item) => (
                <CategoryNameContainer>[{item}]</CategoryNameContainer>
              ))}
              에 대한 추천 결과입니다.
            </CategoryIndicator>
            <SortButtonContainer>
              <SortButton id='time' onClick={handleClickSort}>
                빠른시간순
              </SortButton>
              <SortButton id='review' onClick={handleClickSort}>
                높은평점순
              </SortButton>
            </SortButtonContainer>
          </HeadingContainer>
          <ShopListContainer layout={deliveryShopList.length}>
            {isDetailOpen && <BackDrop onCancel={handleToggleDetail} />}
            {isDetailOpen && (
              <RegionalShopDetail
                shopData={deliveryShopList}
                selected={selectShop}
                onCancel={handleToggleDetail}
              />
            )}
            {limitNumOfItems(deliveryShopList).map((item, idx) => (
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
            <div ref={setTarget}>
              {isLoaded && deliveryShopList.length >= lastIdx ? (
                <div>loading...</div>
              ) : null}
            </div>
          </ShopListContainer>
        </>
      )}
    </>
  );
};

export default RegionalDeliveryShopsPage;
