import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
/* import axios from 'axios'; */
import Loading from '../../../../../../components/UI/loading/Loading.component';
import {
  selectedEatOutCategory,
  userLocation,
} from '../../../../../../store/store';
import RegionalEatOutShopDetail from '../eatout-shops-detail/RegionalEatOutShopDetail.component';
// import useLoadShops from '../../../../hooks/useLoadShops.component';

import {
  formatEatOutWeekdayHour,
  formatEatOutWeekendHour,
} from '../../../../../../functions/formatter';

import {
  ShopTitleContainer,
  ShopImgContainer,
  ShopDescContainer,
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <h2>
              선택하신{' '}
              {chosenEatOutCategories.map((item) => (
                <span>[{item}]</span>
              ))}
              에 대한 추천 결과입니다.
            </h2>
            <FilterBtnContainer>
              <FilterBtn id='time' onClick={handleClickSort}>
                빠른시간순
              </FilterBtn>
              <FilterBtn id='review' onClick={handleClickSort}>
                높은평점순
              </FilterBtn>
            </FilterBtnContainer>
          </div>
          <ShopListContainer>
            {isDetailOpen && <BackDrop onCancel={handleToggleDetail} />}
            {isDetailOpen && (
              <RegionalEatOutShopDetail
                shopData={eatOutShopList}
                selected={selectShop}
                onCancel={handleToggleDetail}
              />
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
                  <b>카테고리</b>: {item.category}
                  <br />
                  <p>
                    <b>영업시간(주중)</b>: {formatEatOutWeekdayHour(item.hour)}
                  </p>
                  <p>
                    {formatEatOutWeekendHour(item.hour) === '' ? (
                      ''
                    ) : (
                      <p>
                        <b>영업시간(주말)</b>:{' '}
                        {formatEatOutWeekendHour(item.hour)}
                      </p>
                    )}
                  </p>
                  <b>평균평점</b>:{' '}
                  {item.rating === 0 ? '평점 없음' : `${item.rating}점`}
                  <br />
                  <b>주소</b>: {item.address}
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
