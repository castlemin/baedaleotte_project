import React from 'react';
import Header from '../../../../components/UI/header/Header.component';
import { useNavigate } from 'react-router-dom';

import {
  NextButton,
  ReportSubtitle,
  ReportTitle,
  ReportContainer,
  GraphConatiner,
  DescriptionSection,
} from '../regional-report/RegionalReportPage.styles';

/* 리포트에서 사용하는 그래프입니다. */
import { GuMap } from '../../../../assets/data/Graphs/GuMap';
import { RiskScore } from '../../../../assets/data/RiskScore';
import { RankGraph } from '../../../../assets/data/Graphs/RankGraph';
import { VaccinGraph } from '../../../../assets/data/Graphs/VaccineGraph';
import { ConfirmedGraph } from '../../../../assets/data/Graphs/ConfirmedGraph';
import { ConfirmedByGuGraph } from '../../../../assets/data/Graphs/ConfirmedByGuGraph';

const RegionalReportPage: React.FC = () => {
  const navigate = useNavigate();

  /* 카테고리 페이지 이동 함수 */
  const handleToCategory = () => {
    navigate('/service/regional/categories/');
  };

  {
    /* <div
      style={{
        display: 'inline-block',
        height: '300px',
        width: '400px',
        backgroundImage: `url(${MockMap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
    <div
      style={{
        display: 'inline-block',
        height: '300px',
        width: '400px',
        backgroundImage: `url(${MockMap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div> */
  }

  return (
    <>
      <ReportTitle>내 지역 코로나 리포트</ReportTitle>
      <ReportContainer>
        <DescriptionSection>
          <GraphConatiner>
            <ReportSubtitle>내 행정구 위험도 지도</ReportSubtitle>
            <GuMap />
            <button>위험도를 산출한 방식이 궁금하다면</button>
          </GraphConatiner>
          <ReportSubtitle>
            현재 당신의 지역 위험도는 <RiskScore />
            점, '이불밖은 위험해'입니다.
          </ReportSubtitle>
        </DescriptionSection>
        <DescriptionSection>
          <ReportSubtitle>
            현재 당신의 지역 위험도는 <RiskScore />
            점, '이불밖은 위험해'입니다.
          </ReportSubtitle>
          <GraphConatiner>
            <ReportSubtitle>내 행정구 위험도 순위</ReportSubtitle>
            <RankGraph />
          </GraphConatiner>
        </DescriptionSection>
        <DescriptionSection>
          <GraphConatiner>
            <ReportSubtitle>백신 접종률</ReportSubtitle>
            <VaccinGraph />
          </GraphConatiner>
          <ReportSubtitle>
            현재 당신의 지역 위험도는 <RiskScore />
            점, '이불밖은 위험해'입니다.
          </ReportSubtitle>
        </DescriptionSection>
        <DescriptionSection>
          <ReportSubtitle>
            현재 당신의 지역 위험도는 <RiskScore />
            점, '이불밖은 위험해'입니다.
          </ReportSubtitle>
          <GraphConatiner>
            <ReportSubtitle>서울시 전체 확진자 현황</ReportSubtitle>
            <ConfirmedGraph />
          </GraphConatiner>
        </DescriptionSection>
        <DescriptionSection>
          <GraphConatiner>
            <ReportSubtitle>행정구별 확진자 현황</ReportSubtitle>
            <ConfirmedByGuGraph />
          </GraphConatiner>
          <ReportSubtitle>
            현재 당신의 지역 위험도는 <RiskScore />
            점, '이불밖은 위험해'입니다.
          </ReportSubtitle>
        </DescriptionSection>
        <NextButton onClick={handleToCategory}>카테고리 선택</NextButton>
      </ReportContainer>
    </>
  );
};

export default RegionalReportPage;
