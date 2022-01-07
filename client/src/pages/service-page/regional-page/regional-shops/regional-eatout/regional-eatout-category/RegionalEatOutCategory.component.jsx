import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  NextButton,
} from './RegionalEatOutCategory.styles';

import { weekDay, hour } from '../../../../../../assets/data/weekDay';
import Header from '../../../../../../components/UI/header/Header.component';
import { eatoutCategories } from '../../../../../../assets/data/eatoutCategories';
import Modal from '../../../../../../components/UI/modal/Modal.component';
import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
import { EATOUT_IMAGES } from '../../../../../../assets/data/imgMapper';
import { selectedEatOutCategory } from '../../../../../../store/store';

const RegionalDeliveryCategoryPage = () => {
  const navigate = useNavigate();
  const [categoryStored, setCategoryStored] = useRecoilState(
    selectedEatOutCategory
  );
  const [isModalClosed, setIsModalClosed] = useState(true);
  const [message, setMessage] = useState('');

  const handleToShopList = () => {
    navigate('/service/regional/eatout_shop_list');
  };

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
          오늘은 {weekDay}, 지금 {hour}시 인기 메뉴는
          <SelectedOptionsTitle>선택 메뉴</SelectedOptionsTitle>
        </PageTitle>
        <SelectedContainer>
          <PlaceHolder selected={categoryStored.length}>
            카테고리를 선택해주세요.
          </PlaceHolder>
          {categoryStored.map((item) => (
            <SelectedCategory imgUrl={EATOUT_IMAGES[item]}>
              <SelectedTitle>{item}</SelectedTitle>
            </SelectedCategory>
          ))}
        </SelectedContainer>
        <NextButton
          onClick={handleToShopList}
          disabled={categoryStored.length < 1}
        >
          추천 가게
        </NextButton>
        <CategoryListContainer>
          {eatoutCategories.map((cat) => (
            <CategoryContainer
              onClick={handleToggleCategory}
              imgUrl={EATOUT_IMAGES[cat]}
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
