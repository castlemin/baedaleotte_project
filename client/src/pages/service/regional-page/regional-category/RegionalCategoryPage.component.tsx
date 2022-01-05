import React, { useState } from 'react';
import {
  CategoryContainer,
  CategoryListContainer,
  CategoryTitle,
  PageTitle,
  SelectedContainer,
  SelectedCategory,
  SelectedTitle,
  PlaceHolder,
} from './RegionalCategory.styles';

import { weekDay, hour } from '../../../../assets/data/weekDay';
import Header from '../../../../components/UI/header/Header.component';
import { categories } from '../../../../assets/data/categories';
import Modal from '../../../../components/UI/modal/Modal.component';
import BackDrop from '../../../../components/UI/BackDrop/BackDrop.component';
import { NextButton } from './RegionalCategory.styles';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../../../assets/data/imgMapper';

const RegionalCategoryPage = () => {
  const navigate = useNavigate();
  const [categorySelected, setCategorySelected] = useState<any[]>([]);
  const [isModalClosed, setIsModalClosed] = useState<boolean>(true);
  const [message, setMessage] = useState('');

  const handleToShopList = () => {
    navigate('/service/regional/shop_list');
  };

  const handleCloseModal = () => {
    setIsModalClosed((prev) => !prev);
  };

  const handleToggleCategory = (event: any) => {
    if (
      categorySelected.length >= 2 &&
      !categorySelected.includes(event.target.textContent)
    ) {
      setMessage('카테고리 선택은 2개까지만 가능합니다!');
      setIsModalClosed((prev) => !prev);
    }
    if (categorySelected.includes(event.target.textContent)) {
      setCategorySelected((prev) =>
        prev.filter((cat) => cat !== event.target.textContent)
      );
    } else if (categorySelected.length < 2) {
      setCategorySelected((prev) => [...prev, event.target.textContent]);
    }
  };

  return (
    <>
      <Header serviceStatic />
      {!isModalClosed && (
        <Modal message={message} onCancel={handleCloseModal} />
      )}
      {!isModalClosed && <BackDrop onCancel={handleCloseModal} />}
      <PageTitle>
        오늘은 {weekDay}, 지금 {hour}시 인기 메뉴는
        <p style={{ marginBottom: 0 }}>선택 메뉴</p>
      </PageTitle>
      <SelectedContainer>
        <PlaceHolder selected={categorySelected.length}>
          카테고리를 선택해주세요.
        </PlaceHolder>
        {categorySelected.map((item) => (
          <SelectedCategory imgUrl={IMAGES[item]}>
            <SelectedTitle>{item}</SelectedTitle>
          </SelectedCategory>
        ))}
      </SelectedContainer>
      <CategoryListContainer>
        {categories.map((cat) => (
          <CategoryContainer
            onClick={handleToggleCategory}
            imgUrl={IMAGES[cat]}
          >
            <CategoryTitle>{cat}</CategoryTitle>
          </CategoryContainer>
        ))}
      </CategoryListContainer>
      <NextButton onClick={handleToShopList}>임시 버튼</NextButton>
    </>
  );
};

export default RegionalCategoryPage;
