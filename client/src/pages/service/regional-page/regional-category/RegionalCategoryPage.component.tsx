import React, { useState } from 'react';
import {
  CategoryListContainer,
  CategoryTitle,
} from './RegionalCategory.styles';

import { weekDay, hour } from '../../../../assets/data/weekDay';
import { DescContainer } from '../../../../components/UI/Text/Text.styles';
import Header from '../../../../components/UI/header/Header.component';
import { categories } from '../../../../assets/data/categories';
import { Card } from '../../../../components/UI/Card/Card.styles';
import Modal from '../../../../components/UI/modal/Modal.component';
import BackDrop from '../../../../components/UI/BackDrop/BackDrop.component';
import { NextButton } from './RegionalCategory.styles';
import { useNavigate } from 'react-router-dom';
import pork_url from '../../../../assets/images/pork_feet.jpeg';
import night_food_url from '../../../../assets/images/night_food.jpeg';
import stew_url from '../../../../assets/images/stew.png';
import japanese_url from '../../../../assets/images/japanese.jpeg';
import chicken_url from '../../../../assets/images/fried_chicken.jpg';
import sushi_url from '../../../../assets/images/sushi.jpeg';
import snack_url from '../../../../assets/images/snack.jpeg';
import pizza_url from '../../../../assets/images/pizza.jpeg';
import dessert_url from '../../../../assets/images/dessert.jpeg';
import porridge_url from '../../../../assets/images/porridge.jpeg';
import asian_url from '../../../../assets/images/asian.png';
import burger_url from '../../../../assets/images/burger.jpeg';
import chinese_url from '../../../../assets/images/chinese.jpeg';
import korean_url from '../../../../assets/images/korean.jpeg';

interface imageUrl {
  [index: string]: string;
}

const IMAGES: imageUrl = {
  족발보쌈: pork_url,
  야식: night_food_url,
  찜탕: stew_url,
  일식돈까스: japanese_url,
  치킨: chicken_url,
  회초밥: sushi_url,
  한식: korean_url,
  분식: snack_url,
  피자양식: pizza_url,
  중식: chinese_url,
  카페디저트: dessert_url,
  도시락죽: porridge_url,
  아시안: asian_url,
  버거: burger_url,
};

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

  const handleSelectCategory = (event: any) => {
    if (
      categorySelected.length >= 2 &&
      !categorySelected.includes(event.target.textContent)
    ) {
      setMessage('카테고리 선택은 2개 까지만 가능합니다!');
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
      <CategoryTitle>
        오늘은 {weekDay}, 지금 {hour}시 인기 메뉴는
        <p>
          선택 메뉴:{' '}
          {categorySelected.map((item) => (
            <span>[{item}]</span>
          ))}
        </p>
      </CategoryTitle>
      <CategoryListContainer>
        {categories.map((cat) => (
          <Card
            category
            onClick={handleSelectCategory}
            style={{
              backgroundImage: `url(${IMAGES[cat]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <DescContainer style={{ backgroundColor: 'black', color: 'white' }}>
              {cat}
            </DescContainer>
          </Card>
        ))}
      </CategoryListContainer>
      <NextButton onClick={handleToShopList}>임시 버튼</NextButton>
    </>
  );
};

export default RegionalCategoryPage;
