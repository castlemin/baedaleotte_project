import axios from 'axios';
import {
  CONFIRMED_ALL_URL,
  CONFIRMED_BY_GU_URL,
  RISK_RANK_GRAPH_URL,
  SEOUL_RISK_MAP_URL,
  VAC_GRAPH_URL,
} from '../assets/data/requestUrls';

const cors = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const fetchThreatMap = async (userDistrict: string) => {
  /* 해당 구의 위험도 지도 요청 */
  try {
    const threatMapRes = await cors.get(`${SEOUL_RISK_MAP_URL}${userDistrict}`);
    const threatMapData = await threatMapRes.data;
    console.log(threatMapData);
    return threatMapData;
  } catch (error) {
    console.log(error);
  }
};

/* 해당 구의 전체 구 대비 위험도 순위 요청*/
export const fetchThreatRank = async (userDistrict: string) => {
  try {
    const threatRankRes = await cors.get(
      `${RISK_RANK_GRAPH_URL}${userDistrict}`
    );
    const threatRankData = await threatRankRes.data;
    return threatRankData;
  } catch (error) {
    console.log(error);
  }
};

/* 서울 전체 백신 접종률 그래프 요청 */
export const fetchVaccineGraph = async () => {
  try {
    const vaccineRes = await cors.get(VAC_GRAPH_URL);
    const vaccineData = await vaccineRes.data;
    return vaccineData;
  } catch (error) {
    console.log(error);
  }
};

/* 서울 전체 확진자 그래프 요청 */
export const fetchTotalConfirmed = async () => {
  try {
    const confirmedTotalRes = await cors.get(CONFIRMED_ALL_URL);
    const confirmedTotalData = await confirmedTotalRes.data;
    return confirmedTotalData;
  } catch (error) {
    console.log(error);
  }
};

/* 해당 구 확진자 그래프 요청 */
export const fetchTotalConfirmedByGu = async (userDistrict: string) => {
  try {
    const confirmedGuRes = await cors.get(
      `${CONFIRMED_BY_GU_URL}${userDistrict}`
    );
    const confirmedGuData = await confirmedGuRes.data;
    return confirmedGuData;
  } catch (error) {
    console.log(error);
  }
};
