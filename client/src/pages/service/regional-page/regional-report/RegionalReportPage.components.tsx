import React from 'react';
import { Card } from '../../../../components/UI/Card/Card.styles';
import Header from '../../../../components/UI/header/Header.component';
import {
  SubtitleContainer,
  TitleContainer,
} from '../../../../components/UI/Text/Text.styles';
import GraphContainer from '../../../../components/UI/Graphs/Graph';
import { useNavigate } from 'react-router-dom';
import { NextButton } from '../regional-category/RegionalCategory.styles';
const RegionalReportPage = () => {
  const navigate = useNavigate();

  const handleToCategory = () => {
    navigate('/service/regional/categories/');
  };

  return (
    <>
      <Header serviceStatic />
      <TitleContainer>현재 지역 코로나 리포트</TitleContainer>
      <Card regionalReport>
        <SubtitleContainer report>현재 코로나 확진세</SubtitleContainer>
        <GraphContainer />
        <NextButton onClick={handleToCategory}>카테고리 선택</NextButton>
      </Card>
    </>
  );
};

export default RegionalReportPage;
