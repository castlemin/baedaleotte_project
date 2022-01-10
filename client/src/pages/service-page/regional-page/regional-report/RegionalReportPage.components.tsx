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
  RISK_SCORE_DETAIL_URL,
  RISK_SCORE_URL,
  SEOUL_RISK_MAP_URL,
  USER_LOCATION_URL,
  VAC_GRAPH_URL,
} from '../../../../assets/data/requestUrls';
import {
  userLocation,
  userGu,
  ThreatScore,
  ThreatScoreDetail,
} from '../../../../store/store';
import Loading from '../../../../components/UI/loading/Loading.component';

import {
  NextButton,
  ReportTitle,
  ReportContainer,
  ReportSection,
  ButtonWrapper,
  GraphContainer,
} from './RegionalReportPage.styles';
import BackDrop from '../../../../components/UI/BackDrop/BackDrop.component';
import { RiskScore } from '../../../../assets/data/RiskScore';
import { ReportThreatMap } from './report-sections/threat-map/ReportThreatMap.component';
import { ReportThreatRank } from './report-sections/threat-rank/ReportThreatRank.component';
import { VaccineGraph } from '../../../../assets/data/Graphs/VaccineGraph';
import { ReportTotalConfirmed } from './report-sections/total-confirmed/ReportTotalConfirmed.component';
import { ReportConfirmedByGu } from './report-sections/confirmed-by-gu/ReportConfirmedByGu.component';
import { ReportVaccineGraph } from './report-sections/vaccine/ReportVaccineGraph.component';

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

  /* 사용자의 좌표 정보 상태값을 전역 store에서 가져옴 */
  const userCoords = useRecoilValue(userLocation);

  /* userGu 상태 atom에 userDistrict이름으로 저장하기 위한 상태값 */
  const [userDistrict, setUserDistrict] = useRecoilState(userGu);

  /* 모든 그래프 정보(JSON)를 담을 상태값 */
  const [graphs, setGraphs] = useState<any>();

  /* 위험도 점수(String)를 담을 상태값 */
  const [riskScore, setRiskScore] = useRecoilState(ThreatScore);

  /* 상태값 세부 정보 
  - rate: 코로나 증감률 예측치
  - stack: 코로나 누적 점수
  - population: 생활인구 점수
  - family: 평균가구 점수
  - fac: 대중이용 시설 분포 점수
  - rank: 코로나 위험도 순위
  */
  const [riskScoreDetail, setRiskScoreDetail] =
    useRecoilState<any>(ThreatScoreDetail);

  /* 카테고리 페이지 이동 : id 가 toDelivery이면 배달음식 카테고리 페이지으로, 다른 경우 외식 카테고리 페이지로 이동*/
  const handleToCategory = (event: any) => {
    if (event.target.id === 'toDelivery') {
      navigate('/service/regional/delivery_categories/');
    } else {
      navigate('/service/regional/eatout_categories/');
    }
  };

  /* post 요청에 params로 넘겨줄 유저 좌표 */
  const params = { lat: 37.5384, lng: 126.9654 };

  /* CORS 규약 위반 에러 방지를 위한 header 설정 */
  const cors = axios.create({
    headers: {
      'Access-Control-Allow-Origin':
        'elice-kdt-3rd-team-04.koreacentral.cloudapp.azure.com',
    },
  });

  /* 리포트 페이지 내, 최초 화면 렌더링 이후 실행할 사이드 이펙트*/
  useEffect(() => {
    /* POST 요청으로 유저의 좌표 정보를 보내 백엔드 서버에 '서울 지역구' 문자열 요청 ex) 용산구 */
    const sendUserLocation = async () => {
      const sendCoords = await cors.post(USER_LOCATION_URL, params);
      const targetDistrict = sendCoords.data.region;
      setUserDistrict(targetDistrict);
    };
    /* 함수 실행단 */
    sendUserLocation();

    /* 모든 그래프 정보의 GET 요청을 한번에 실행한다
    (그래프를 받아오는 데 시간이 걸리더라도 기존의 반복 렌더링 문제를 방지) */
    const getGraph = async () => {
      /* 해당 구의 위험도 지도 요청 */
      const threatMapRes = await cors.get(
        `${SEOUL_RISK_MAP_URL}${userDistrict}`
      );
      const threatMapData = await threatMapRes.data;

      /* 해당 구의 전체 구 대비 위험도 순위 요청*/
      const threatRankRes = await cors.get(
        `${RISK_RANK_GRAPH_URL}${userDistrict}`
      );
      const threatRankData = await threatRankRes.data;

      /* 서울 전체 백신 접종률 그래프 요청 */
      const vaccineRes = await cors.get(VAC_GRAPH_URL);
      const vaccineData = await vaccineRes.data;

      /* 서울 전체 확진자 그래프 요청 */
      const confirmedTotalRes = await cors.get(CONFIRMED_ALL_URL);
      const confirmedTotalData = await confirmedTotalRes.data;

      /* 해당 구 확진자 그래프 요청 */
      const confirmedGuRes = await cors.get(
        `${CONFIRMED_BY_GU_URL}${userDistrict}`
      );
      const confirmedGuData = await confirmedGuRes.data;

      /* 위험도 점수 요청 */
      const riskScoreRes = await cors.get(`${RISK_SCORE_URL}${userDistrict}`);
      const riskScoreData = await riskScoreRes.data;

      /* 위험도 세부 정보 요청 */
      const riskScoreDetailRes = await cors.get(
        `${RISK_SCORE_DETAIL_URL}${userDistrict}`
      );
      const riskScoreDetailData = await riskScoreDetailRes.data;

      /* 그래프 정보 객체 덩어리를 한 배열안에 묶어 Recoil 상태값으로 저장, 
      렌더 단에서 반복문으로 화면에 그려주기 위함*/
      setGraphs([
        threatMapData,
        threatRankData,
        vaccineData,
        confirmedTotalData,
        confirmedGuData,
      ]);

      /* 위험도 점수와 세부 정보 또한 전역 recoil 상태값으로 저장 */
      setRiskScore(riskScoreData);
      setRiskScoreDetail(riskScoreDetailData);
    };
    getGraph();
  }, []);

  console.log(riskScoreDetail);
  return (
    <ReportContainer>
      {/* 그래프가 로드 되지 않았을 시, 대신 로딩 페이지를 보여줍니다. */}
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
                  {/* Plot 데이터를 반복문으로 뽑으면서 각각 다른 스타일을 적용하기 위함 */}
                  {Number(idx) === 0 ? (
                    <ReportThreatMap
                      location={userDistrict}
                      score={riskScore}
                      rate={riskScoreDetail.rate}
                      population={riskScoreDetail.population}
                      family={riskScoreDetail.family}
                      facillity={riskScoreDetail.fac}
                    >
                      <Plot data={graph.data} layout={graph.layout} />
                    </ReportThreatMap>
                  ) : Number(idx) === 1 ? (
                    <ReportThreatRank rank={riskScoreDetail.rank}>
                      <Plot data={graph.data} layout={graph.layout} />
                    </ReportThreatRank>
                  ) : Number(idx) === 2 ? (
                    <ReportVaccineGraph
                      vacRate={graphs[2].data[1].text[6]}
                      date={graphs[2].data[0].x[6]}
                    >
                      <Plot data={graph.data} layout={graph.layout} />
                    </ReportVaccineGraph>
                  ) : Number(idx) === 3 ? (
                    <ReportTotalConfirmed
                      totalNum={graphs[3].data[0].text[6]}
                      addNum={graphs[3].data[1].text[6]}
                      date={graphs[3].data[0].x[6]}
                    >
                      <Plot data={graph.data} layout={graph.layout} />
                    </ReportTotalConfirmed>
                  ) : (
                    <ReportConfirmedByGu
                      score={riskScore}
                      regionRate={riskScoreDetail.region_rate}
                    >
                      <Plot data={graph.data} layout={graph.layout} />
                    </ReportConfirmedByGu>
                  )}
                  {/* 그래프 화면 출력이 끝나는 지점 입니다. */}
                </GraphContainer>
              </ReportSection>
            ))}
          </Suspense>
          {/* 위험도 점수가 60점 이상이라면 내 지역 배달 음식 카테고리로, 
          그렇지 않다면 외식점 카테고리로 이동을 제한. */}
          <ButtonWrapper>
            {Number(riskScore) >= 60 ? (
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
        </>
      )}
    </ReportContainer>
  );
};

export default RegionalReportPage;
