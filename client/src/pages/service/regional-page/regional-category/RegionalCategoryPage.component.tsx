import React from 'react';
import { CategoryListContainer } from './RegionalCategory.styles';

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

const RegionalCategoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleToShopList = () => {
    navigate('/service/regional/shop_list');
  };

  return (
    <>
      <Header serviceStatic />
      <TitleContainer>
        오늘은 {weekDay}, 지금 {hour}시 인기 메뉴는
      </TitleContainer>
      <CategoryListContainer>
        {categories.map((cat) => (
          <Card category>
            <DescContainer>{cat}</DescContainer>
          </Card>
        ))}
      </CategoryListContainer>
      <NextButton onClick={handleToShopList}>임시 버튼</NextButton>
    </>
  );
};

export default RegionalCategoryPage;
