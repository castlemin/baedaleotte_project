import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
/* import axios from 'axios'; */
import Loading from '../../../../../../components/UI/loading/Loading.component';
import {
  selectedEatOutCategory,
  userLocation,
} from '../../../../../../store/store';

import {
  formatEatOutWeekdayHour,
  formatEatOutWeekendHour,
} from '../../../../../../functions/formatter';

import {
  HeadingContainer,
  CategoryIndicator,
  CategoryNameContainer,
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
  ShopDescContent,
  ShopListContainer,
  FilterBtn,
  FilterBtnContainer,
  ShopContainer,
} from './RegionalEatOutShopsPage.styles';
import { EAT_OUT_LIST_URL } from '../../../../../../assets/data/requestUrls';

const RegionalEatOutShopsPage: React.FC = () => {
  const [eatOutShopList, setEatOutShopList] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [selectShop, setSelectShop] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const chosenEatOutCategories = useRecoilValue(selectedEatOutCategory);
  const userCoords = useRecoilValue(userLocation);

  const RegionalEatOutShopDetail = React.lazy(
    () => import('../eatout-shops-detail/RegionalEatOutShopDetail.component')
  );

  const params = userCoords;

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.post(EAT_OUT_LIST_URL, params);
      const data = res.data;
      const filteredData = await data.filter(
        (item: any) =>
          item.category === chosenEatOutCategories[0] ||
          item.category === chosenEatOutCategories[1]
      );
      setEatOutShopList(filteredData);
    };
    fetchRestaurants();
  }, []);

  console.log(eatOutShopList);

  const handleToEatOutDetail = (event: any) => {
    setSelectShop(event.target.id);
    handleToggleDetail();
    console.log(selectShop);
  };

  const handleToggleDetail = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const handleClickSort = (event: any) => {
    if (event.target.id === 'review') {
      setEatOutShopList((prev) => [
        ...prev.sort((a, b) => b.rating - a.rating),
      ]);
    } else if (event.target.id === 'time') {
      setEatOutShopList((prev) => [
        ...prev.sort(
          (a, b) =>
            parseInt(a.hour.slice(9, 11)) - parseInt(b.hour.slice(9, 11))
        ),
      ]);
    }
  };

  return (
    <>
      {!eatOutShopList ? (
        <Loading />
      ) : (
        <>
          <HeadingContainer
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <CategoryIndicator>
              선택하신{' '}
              {chosenEatOutCategories.map((item) => (
                <CategoryNameContainer>[{item}]</CategoryNameContainer>
              ))}
              에 대한 추천 결과입니다.
            </CategoryIndicator>
            <FilterBtnContainer>
              <FilterBtn id='time' onClick={handleClickSort}>
                빠른시간순
              </FilterBtn>
              <FilterBtn id='review' onClick={handleClickSort}>
                높은평점순
              </FilterBtn>
            </FilterBtnContainer>
          </HeadingContainer>
          <ShopListContainer>
            {isDetailOpen && <BackDrop onCancel={handleToggleDetail} />}
            {isDetailOpen && (
              <Suspense fallback={<Loading />}>
                <RegionalEatOutShopDetail
                  shopData={eatOutShopList}
                  selected={selectShop}
                  onCancel={handleToggleDetail}
                />
              </Suspense>
            )}
            {eatOutShopList.map((item, idx) => (
              <ShopContainer
                key={idx}
                onClick={handleToEatOutDetail}
                id={item.id}
              >
                <ShopImgContainer id={item.id} url={item.img_url_3} />
                <ShopTitleContainer id={item.id}>
                  {item.name}
                </ShopTitleContainer>
                <ShopDescContainer id={item.id}>
                  <ShopDescContent>
                    <b>카테고리</b>: {item.category}
                  </ShopDescContent>
                  <ShopDescContent>
                    <b>영업시간(주중)</b>: {formatEatOutWeekdayHour(item.hour)}
                  </ShopDescContent>
                  <ShopDescContent>
                    {formatEatOutWeekendHour(item.hour) === '' ? (
                      ''
                    ) : (
                      <ShopDescContent>
                        <b>영업시간(주말)</b>:{' '}
                        {formatEatOutWeekendHour(item.hour)}
                      </ShopDescContent>
                    )}
                  </ShopDescContent>
                  <ShopDescContent>
                    <b>평균평점</b>:{' '}
                  </ShopDescContent>
                  {item.rating === 0 ? '평점 없음' : `${item.rating}점`}
                  <ShopDescContent>
                    <b>주소</b>: {item.address}
                  </ShopDescContent>
                </ShopDescContainer>
              </ShopContainer>
            ))}
          </ShopListContainer>
        </>
      )}
    </>
  );
};

export default RegionalEatOutShopsPage;
