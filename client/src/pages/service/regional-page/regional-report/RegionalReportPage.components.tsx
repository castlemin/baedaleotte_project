import React from 'react';
import { Card } from '../../../../components/UI/Card/Card.styles';
import Header from '../../../../components/UI/header/Header.component';
import {
  DescContainer,
  SubtitleContainer,
  TitleContainer,
} from '../../../../components/UI/Text/Text.styles';
import { GuMap } from '../../../../assets/data/Graphs/GuMap';
import { SeoulMap } from '../../../../assets/data/Graphs/SeoulMap';
import { useNavigate } from 'react-router-dom';
import { NextButton } from '../regional-report/RegionalReportPage.styles';
import { riskScore } from '../../../../assets/data/RiskScore';

const RegionalReportPage: React.FC = () => {
  const navigate = useNavigate();

  const handleToCategory = () => {
    navigate('/service/regional/categories/');
  };

  return (
    <>
      <Header serviceStatic />
      <TitleContainer>현재 지역 코로나 리포트</TitleContainer>
      <SubtitleContainer report>내 행정구 위험도</SubtitleContainer>
      <GuMap />
      <SeoulMap />
      <NextButton onClick={handleToCategory}>카테고리 선택</NextButton>
    </>
  );
};

export default RegionalReportPage;
