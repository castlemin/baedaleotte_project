import React, { Suspense, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Header from '../../../../components/UI/header/Header.component';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  CONFIRMED_ALL_URL,
  CONFIRMED_BY_GU_URL,
  RISK_RANK_GRAPH_URL,
  RISK_SCORE_URL,
  SEOUL_RISK_MAP_URL,
  USER_LOCATION_URL,
  VAC_GRAPH_URL,
} from '../../../../assets/data/requestUrls';
import { userLocation, userGu } from '../../../../store/store';
import Loading from '../../../../components/UI/loading/Loading.component';

import {
  NextButton,
  ReportTitle,
  ReportContainer,
  ReportSection,
  ButtonWrapper,
  ThreatMapReportSection,
  ThreatRankReportSection,
  VaccineReportSection,
  ConfirmedAllReportSection,
  ConfirmedGuReportSection,
  GraphContainer,
  ReportDesc,
} from './RegionalReportPage.styles';
import BackDrop from '../../../../components/UI/BackDrop/BackDrop.component';
import { RiskScore } from '../../../../assets/data/RiskScore';
import { ReportThreatMap } from './report-sections/threat-map/ReportThreatMap.component';

/* 리포트에서 사용하는 그래프입니다. */
// const ReportThreatMap = React.lazy(() =>
//   import('./report-sections/threat-map/ReportThreatMap.component').then(
//     ({ ReportThreatMap }) => ({ default: ReportThreatMap })
//   )
// );
// const ReportThreatRank = React.lazy(() =>
//   import('./report-sections/threat-rank/ReportThreatRank.component').then(
//     ({ ReportThreatRank }) => ({ default: ReportThreatRank })
//   )
// );
// const ReportVaccineGraph = React.lazy(() =>
//   import('./report-sections/vaccine/ReportVaccineGraph.component').then(
//     ({ ReportVaccineGraph }) => ({ default: ReportVaccineGraph })
//   )
// );
// const ReportTotalConfirmed = React.lazy(() =>
//   import(
//     './report-sections/total-confirmed/ReportTotalConfirmed.component'
//   ).then(({ ReportTotalConfirmed }) => ({ default: ReportTotalConfirmed }))
// );
// const ReportConfirmedByGu = React.lazy(() =>
//   import(
//     './report-sections/confirmed-by-gu/ReportConfirmedByGu.component'
//   ).then(({ ReportConfirmedByGu }) => ({ default: ReportConfirmedByGu }))
// );

const RegionalReportPage: React.FC = () => {
  const navigate = useNavigate();
  const userCoords = useRecoilValue(userLocation);
  const [userDistrict, setUserDistrict] = useRecoilState(userGu);
  const [graphs, setGraphs] = useState<any>();
  const [riskScore, setRiskScore] = useState();

  /* 카테고리 페이지 이동 함수 */
  const handleToCategory = (event: any) => {
    if (event.target.id === 'toDelivery') {
      navigate('/service/regional/delivery_categories/');
    } else {
      navigate('/service/regional/eatout_categories/');
    }
  };

  const params = { lat: 37.5384, lng: 126.9654 };

  const cors = axios.create({
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  useEffect(() => {
    const sendUserLocation = async () => {
      const sendCoords = await cors.post(USER_LOCATION_URL, params);
      const targetDistrict = sendCoords.data.region;
      setUserDistrict(targetDistrict);
    };
    sendUserLocation();
  }, []);

  useEffect(() => {
    const getGraph = async () => {
      const threatMapRes = await cors.get(
        `${SEOUL_RISK_MAP_URL}${userDistrict}`
      );
      const threatMapData = await threatMapRes.data;
      const threatRankRes = await cors.get(
        `${RISK_RANK_GRAPH_URL}${userDistrict}`
      );
      const threatRankData = await threatRankRes.data;
      const vaccineRes = await cors.get(VAC_GRAPH_URL);
      const vaccineData = await vaccineRes.data;
      const confirmedTotalRes = await cors.get(CONFIRMED_ALL_URL);
      const confirmedTotalData = await confirmedTotalRes.data;
      const confirmedGuRes = await cors.get(
        `${CONFIRMED_BY_GU_URL}${userDistrict}`
      );
      const confirmedGuData = await confirmedGuRes.data;
      const riskScoreRes = await cors.get(`${RISK_SCORE_URL}${userDistrict}`);
      const riskScoreData = await riskScoreRes.data;
      setGraphs([
        threatMapData,
        threatRankData,
        vaccineData,
        confirmedTotalData,
        confirmedGuData,
      ]);
      setRiskScore(riskScoreData);
    };
    getGraph();
  }, []);

  return (
    <ReportContainer>
      {!graphs ? (
        <Loading />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <ReportTitle style={{ display: 'absolute' }}>
              내 지역 코로나 리포트
            </ReportTitle>
            {graphs.map((graph: any, idx: string) => (
              <ReportSection key={idx} id={idx}>
                <GraphContainer>
                  <Plot data={graph.data} layout={graph.layout} />
<<<<<<< HEAD
                </GraphContainer>
                <ReportDesc>설명글</ReportDesc>
=======
                  <ReportThreatMap />
                </GraphContainer>
>>>>>>> feature/Frontend#22
              </ReportSection>
            ))}
          </Suspense>
          <ButtonWrapper>
            <NextButton id='toDelivery' onClick={handleToCategory}>
              내 지역 배달 음식점 찾으러 가기
            </NextButton>
            <>
              <NextButton id='toDelivery' onClick={handleToCategory}>
                내 지역 배달 음식점 찾으러 가기
              </NextButton>
              <NextButton id='toEatOut' onClick={handleToCategory}>
                내 근처 외식점 찾으러 가기
              </NextButton>
            </>
          </ButtonWrapper>
        </>
      )}
    </ReportContainer>
  );
};

export default RegionalReportPage;
