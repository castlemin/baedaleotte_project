import React, { useState } from 'react';
import {
  CategoryListContainer,
  CategoryTitle,
} from './RegionalCategory.styles';

import { weekDay, hour } from '../../../../assets/data/weekDay';
import {
  TitleContainer,
  DescContainer,
} from '../../../../components/UI/Text/Text.styles';
import Header from '../../../../components/UI/header/Header.component';
import { categories } from '../../../../assets/data/categories';
import { Card } from '../../../../components/UI/Card/Card.styles';
import { NextButton } from './RegionalCategory.styles';
import { useNavigate } from 'react-router-dom';

const RegionalCategoryPage = () => {
  const navigate = useNavigate();
  const [categorySelected, setCategorySelected] = useState<any[]>([]);

  const handleToShopList = () => {
    navigate('/service/regional/shop_list');
  };

  const handleSelectCategory = (event: any) => {
    setCategorySelected((prev) => [...prev, event.target.textContent]);
  };

  console.log(categorySelected);

  return (
    <>
      <Header serviceStatic />
      <CategoryTitle>
        오늘은 {weekDay}, 지금 {hour}시 인기 메뉴는
      </CategoryTitle>
      <CategoryListContainer>
        {categories.map((cat) => (
          <Card category onClick={handleSelectCategory}>
            <DescContainer>{cat}</DescContainer>
          </Card>
        ))}
      </CategoryListContainer>
      <NextButton onClick={handleToShopList}>임시 버튼</NextButton>
    </>
  );
};

export default RegionalCategoryPage;
