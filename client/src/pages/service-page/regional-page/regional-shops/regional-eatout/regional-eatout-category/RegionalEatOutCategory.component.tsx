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
  NextButton,
  ToMainButton,
} from './RegionalEatOutCategory.styles';

import Header from '../../../../../../components/UI/header/Header.component';
import { eatoutCategories } from '../../../../../../assets/data/eatoutCategories';
import Modal from '../../../../../../components/UI/modal/Modal.component';
import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
import { EATOUT_IMAGES } from '../../../../../../assets/data/imgMapper';
import { selectedEatOutCategory } from '../../../../../../store/store';
import { ButtonsContainer } from './RegionalEatOutCategory.styles';

const RegionalDeliveryCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [categoryStored, setCategoryStored] = useRecoilState<any>(
    selectedEatOutCategory
  );
  const [isModalClosed, setIsModalClosed] = useState(true);
  const [message, setMessage] = useState('');

  const handleToShopList = () => {
    navigate('/service/regional/eatout_shop_list');
  };

  const handleToMain = () => {
    navigate('/');
  };

  const handleCloseModal = () => {
    setIsModalClosed((prev) => !prev);
  };

  const handleToggleCategory = (event: any) => {
    if (
      categoryStored.length >= 2 &&
      !categoryStored.includes(event.target.textContent)
    ) {
      setMessage('카테고리 선택은 2개까지만 가능합니다!');
      setIsModalClosed((prev) => !prev);
    }
    if (categoryStored.includes(event.target.textContent)) {
      setCategoryStored((prev: any) =>
        prev.filter((cat: any) => cat !== event.target.textContent)
      );
    } else if (categoryStored.length < 2) {
      setCategoryStored((prev: any) => [...prev, event.target.textContent]);
    }
  };

  return (
    <>
      {!isModalClosed && (
        <Modal message={message} onCancel={handleCloseModal} />
      )}
      {!isModalClosed && <BackDrop onCancel={handleCloseModal} />}
      <CategoryTemplate>
        <SelectedOptionsTitle>외식점 메뉴 선택</SelectedOptionsTitle>
        <ButtonsContainer>
          <ToMainButton onClick={handleToMain}>메인으로</ToMainButton>
          <SelectedContainer>
            <PlaceHolder selected={categoryStored.length}>
              카테고리를 선택해주세요.
            </PlaceHolder>
            {categoryStored.map((item: any) => (
              <SelectedCategory
                onClick={handleToggleCategory}
                imgUrl={EATOUT_IMAGES[item]}
              >
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
        </ButtonsContainer>
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
