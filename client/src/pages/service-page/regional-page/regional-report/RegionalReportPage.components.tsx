import React, { Suspense, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../../components/UI/header/Header.component';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { USER_LOCATION_URL } from '../../../../assets/data/requestUrls';
import { userLocation, userGu } from '../../../../store/store';
import Loading from '../../../../components/UI/loading/Loading.component';

import {
  NextButton,
  ReportTitle,
  ReportContainer,
  ButtonWrapper,
  ThreatMapReportSection,
  ThreatRankReportSection,
  VaccineReportSection,
  ConfirmedAllReportSection,
  ConfirmedGuReportSection,
} from './RegionalReportPage.styles';
import BackDrop from '../../../../components/UI/BackDrop/BackDrop.component';
import { RiskScore } from '../../../../assets/data/RiskScore';

/* 리포트에서 사용하는 그래프입니다. */

const RegionalReportPage: React.FC = () => {
  const navigate = useNavigate();
  const userCoords = useRecoilValue(userLocation);
  const [userDistrict, setUserDistrict] = useRecoilState(userGu);

  const riskScore = RiskScore();

  /* 카테고리 페이지 이동 함수 */
  const handleToCategory = (event: any) => {
    if (event.target.id === 'toDelivery') {
      navigate('/service/regional/delivery_categories/');
    } else {
      navigate('/service/regional/eatout_categories/');
    }
  };

  const params = { lat: 37.5384, lng: 126.9654 };

  useEffect(() => {
    const sendUserLocation = async () => {
      const sendCoords = await axios.post(USER_LOCATION_URL, params);
      const targetDistrict = sendCoords.data.region;
      setUserDistrict(targetDistrict);
    };
    sendUserLocation();
  }, []);

  const ReportThreatMap = React.lazy(() =>
    import('./report-sections/threat-map/ReportThreatMap.component').then(
      ({ ReportThreatMap }) => ({ default: ReportThreatMap })
    )
  );
  const ReportThreatRank = React.lazy(() =>
    import('./report-sections/threat-rank/ReportThreatRank.component').then(
      ({ ReportThreatRank }) => ({ default: ReportThreatRank })
    )
  );
  const ReportVaccineGraph = React.lazy(() =>
    import('./report-sections/vaccine/ReportVaccineGraph.component').then(
      ({ ReportVaccineGraph }) => ({ default: ReportVaccineGraph })
    )
  );
  const ReportTotalConfirmed = React.lazy(() =>
    import(
      './report-sections/total-confirmed/ReportTotalConfirmed.component'
    ).then(({ ReportTotalConfirmed }) => ({ default: ReportTotalConfirmed }))
  );
  const ReportConfirmedByGu = React.lazy(() =>
    import(
      './report-sections/confirmed-by-gu/ReportConfirmedByGu.component'
    ).then(({ ReportConfirmedByGu }) => ({ default: ReportConfirmedByGu }))
  );

  return (
    <>
      <ReportContainer>
        <Suspense fallback={<Loading />}>
          <ThreatMapReportSection>
            <ReportTitle>내 지역 코로나 리포트</ReportTitle>
            <ReportThreatMap />
          </ThreatMapReportSection>
          <ThreatRankReportSection>
            <ReportThreatRank />
          </ThreatRankReportSection>
          <VaccineReportSection>
            <ReportVaccineGraph />
          </VaccineReportSection>
          <ConfirmedAllReportSection>
            <ReportTotalConfirmed />
          </ConfirmedAllReportSection>
          <ConfirmedGuReportSection>
            <ReportConfirmedByGu />
          </ConfirmedGuReportSection>
        </Suspense>
        <ButtonWrapper>
          {riskScore >= 60 ? (
            <NextButton id='toDelivery' onClick={handleToCategory}>
              내 지역 배달 음식점 찾으러 가기
            </NextButton>
          ) : (
            <>
              <NextButton id='toDelivery' onClick={handleToCategory}>
                내 지역 배달 음식점 찾으러 가기
              </NextButton>
              <NextButton id='toEatOut' onClick={handleToCategory}>
                내 근처 외식점 찾으러 가기
              </NextButton>
            </>
          )}
        </ButtonWrapper>
      </ReportContainer>
    </>
  );
};

export default RegionalReportPage;
