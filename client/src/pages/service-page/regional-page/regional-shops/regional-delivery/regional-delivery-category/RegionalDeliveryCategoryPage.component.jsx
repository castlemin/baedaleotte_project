import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  CategoryTemplate,
  CategoryContainer,
  CategoryListContainer,
  CategoryTitle,
  PageTitle,
  SelectedContainer,
  SelectedCategory,
  SelectedTitle,
  SelectedOptionsTitle,
  PlaceHolder,
} from './RegionalDeliveryCategory.styles';

import { weekDay, hour } from '../../../../../../assets/data/weekDay';
import Header from '../../../../../../components/UI/header/Header.component';
import { deliveryCategories } from '../../../../../../assets/data/deliveryCategories';
import Modal from '../../../../../../components/UI/modal/Modal.component';
import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
import { NextButton } from './RegionalDeliveryCategory.styles';
import { DELIVERY_IMAGES } from '../../../../../../assets/data/imgMapper';
import { selectedDeliveryCategory } from '../../../../../../store/store';
import { CategoryTop5 } from '../../../../../../assets/data/Graphs/CategoryTop5';

const RegionalDeliveryCategoryPage = () => {
  const navigate = useNavigate();

  /* 선택한 카테고리를 담는 recoil 상태값 */
  const [categoryStored, setCategoryStored] = useRecoilState(
    selectedDeliveryCategory
  );

  const [isModalClosed, setIsModalClosed] = useState(true);

  /* 모달 경고 메시지를 설정 */
  const [message, setMessage] = useState('');

  /* shopList 로 이동 */
  const handleToShopList = () => {
    navigate('/service/regional/delivery_shop_list');
  };

  /* 모달 여닫기용 플래그 상태값 */
  const handleCloseModal = () => {
    setIsModalClosed((prev) => !prev);
  };

  const handleToggleCategory = (event) => {
    if (
      categoryStored.length >= 2 &&
      !categoryStored.includes(event.target.textContent)
    ) {
      setMessage('카테고리 선택은 2개까지만 가능합니다!');
      setIsModalClosed((prev) => !prev);
    }
    if (categoryStored.includes(event.target.textContent)) {
      setCategoryStored((prev) =>
        prev.filter((cat) => cat !== event.target.textContent)
      );
    } else if (categoryStored.length < 2) {
      setCategoryStored((prev) => [...prev, event.target.textContent]);
    }
  };

  return (
    <>
      <Header serviceStatic />
      {!isModalClosed && (
        <Modal message={message} onCancel={handleCloseModal} />
      )}
      {!isModalClosed && <BackDrop onCancel={handleCloseModal} />}
      <CategoryTemplate style={{ display: 'flex', flexDirection: 'column' }}>
        <PageTitle>
          오늘은 {weekDay}, 지금 {hour}시 인기 메뉴는: <CategoryTop5 />
          <SelectedOptionsTitle>
            선택 메뉴
            <br />
            메뉴는 1개 이상 선택해주세요.
          </SelectedOptionsTitle>
        </PageTitle>
        <SelectedContainer>
          <PlaceHolder selected={categoryStored.length}>
            카테고리를 선택해주세요.
          </PlaceHolder>
          {categoryStored.map((item) => (
            <SelectedCategory
              onClick={handleToggleCategory}
              imgUrl={DELIVERY_IMAGES[item]}
            >
              <SelectedTitle>{item}</SelectedTitle>
            </SelectedCategory>
          ))}
        </SelectedContainer>
        <NextButton
          onClick={handleToShopList}
          disabled={categoryStored.length < 1}
        >
          추천 가게 보기
        </NextButton>
        <CategoryListContainer>
          {deliveryCategories.map((cat) => (
            <CategoryContainer
              onClick={handleToggleCategory}
              imgUrl={DELIVERY_IMAGES[cat]}
            >
              <CategoryTitle>{cat}</CategoryTitle>
            </CategoryContainer>
          ))}
        </CategoryListContainer>
      </CategoryTemplate>
    </>
  );
};

export default RegionalDeliveryCategoryPage;
