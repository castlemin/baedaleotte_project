import React from 'react';
import { Card } from '../../../../components/UI/Card/Card.styles';
import Header from '../../../../components/UI/header/Header.component';
import {
  SubtitleContainer,
  TitleContainer,
} from '../../../../components/UI/Text/Text.styles';
import { GuMap } from '../../../../assets/data/Graphs/GuMap';
import { useNavigate } from 'react-router-dom';
import { NextButton } from '../regional-report/RegionalReportPage.styles';
import { RankGraph } from '../../../../assets/data/Graphs/RankGraph';

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
        <SubtitleContainer report>내 행정구 위험도</SubtitleContainer>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <RankGraph />
          <GuMap />
        </div>
        <NextButton onClick={handleToCategory}>카테고리 선택</NextButton>
      </Card>
    </>
  );
};

export default RegionalReportPage;
