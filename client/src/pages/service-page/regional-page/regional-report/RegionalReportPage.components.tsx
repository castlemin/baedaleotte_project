import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../../../../components/UI/header/Header.component';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { lazy } from 'react';
import IntroLottie from '../../../../components/UI/IntroLottie/IntroLottie.component';
import { USER_LOCATION_URL } from '../../../../assets/data/locationUrl';

import {
  NextButton,
  ReportTitle,
  ReportContainer,
  ButtonWrapper,
} from './RegionalReportPage.styles';

/* 리포트에서 사용하는 그래프입니다. */
import { ReportThreatMap } from './report-sections/threat-map/ReportThreatMap.component';
import { ReportThreatRank } from './report-sections/threat-rank/ReportThreatRank.component';
import { ReportVaccineGraph } from './report-sections/vaccine/ReportVaccineGraph.component';
import { ReportTotalConfirmed } from './report-sections/total-confirmed/ReportTotalConfirmed.component';
import { ReportConfirmedByGu } from './report-sections/confirmed-by-gu/ReportConfirmedByGu.component';
import { userLocation } from '../../../../store/store';

const RegionalReportPage: React.FC = () => {
  const navigate = useNavigate();
  const userCoords = useRecoilValue(userLocation);

  /* 카테고리 페이지 이동 함수 */
  const handleToCategory = (event: any) => {
    if (event.target.id === 'toDelivery') {
      navigate('/service/regional/delivery_categories/');
    } else {
      navigate('/service/regional/eatout_categories/');
    }
  };

  const params = userCoords;

  useEffect(() => {
    const sendUserLocation = async () => {
      const response = await axios.post(USER_LOCATION_URL, params);
    };
    sendUserLocation();
  }, []);

  return (
    <>
      <ReportTitle>내 지역 코로나 리포트</ReportTitle>
      <ReportContainer>
        <ReportThreatMap />
        <ReportThreatRank />
        <ReportVaccineGraph />
        <ReportTotalConfirmed />
        <ReportConfirmedByGu />
        <ButtonWrapper>
          <NextButton id='toDelivery' onClick={handleToCategory}>
            내 지역 배달 음식점 찾으러 가기
          </NextButton>
          <NextButton id='toEatOut' onClick={handleToCategory}>
            내 근처 외식점 찾으러 가기
          </NextButton>
        </ButtonWrapper>
      </ReportContainer>
    </>
  );
};

export default RegionalReportPage;
