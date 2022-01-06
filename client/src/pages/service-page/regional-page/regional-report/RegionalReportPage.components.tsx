import React from 'react';
import Header from '../../../../components/UI/header/Header.component';
import { useNavigate } from 'react-router-dom';
import { lazy } from 'react';

import {
  NextButton,
  ReportTitle,
  ReportContainer,
} from './RegionalReportPage.styles';

/* 리포트에서 사용하는 그래프입니다. */
import { ReportThreatMap } from './report-sections/threat-map/ReportThreatMap.component';
import { ReportThreatRank } from './report-sections/threat-rank/ReportThreatRank.component';
import { ReportVaccineGraph } from './report-sections/vaccine/ReportVaccineGraph.component';
import { ReportTotalConfirmed } from './report-sections/total-confirmed/ReportTotalConfirmed.component';
import { ReportConfirmedByGu } from './report-sections/confirmed-by-gu/ReportConfirmedByGu.component';

const RegionalReportPage: React.FC = () => {
  const navigate = useNavigate();

  /* 카테고리 페이지 이동 함수 */
  const handleToCategory = () => {
    navigate('/service/regional/categories/');
  };

  return (
    <>
      <ReportTitle>내 지역 코로나 리포트</ReportTitle>
      <ReportContainer>
        <ReportThreatMap />
        <ReportThreatRank />
        <ReportVaccineGraph />
        <ReportTotalConfirmed />
        <ReportConfirmedByGu />
        <NextButton onClick={handleToCategory}>
          내 지역 배달 음식점 찾으러 가기
        </NextButton>
      </ReportContainer>
    </>
  );
};

export default RegionalReportPage;
