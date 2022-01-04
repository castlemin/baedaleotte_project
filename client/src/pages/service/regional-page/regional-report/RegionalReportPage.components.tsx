import React from 'react';
import { Card } from '../../../../components/UI/Card/Card.styles';
import Header from '../../../../components/UI/header/Header.component';
import {
  SubtitleContainer,
  TitleContainer,
} from '../../../../components/UI/Text/Text.styles';
import { GuMap } from '../../../../components/UI/Graphs/GuMap';
import { useNavigate } from 'react-router-dom';
import { NextButton } from '../regional-report/RegionalReportPage.styles';

const RegionalReportPage: React.FC = () => {
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
        <GuMap />
        <NextButton onClick={handleToCategory}>카테고리 선택</NextButton>
      </Card>
    </>
  );
};

export default RegionalReportPage;
