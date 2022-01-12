import axios from 'axios';
import {
  RISK_SCORE_DETAIL_URL,
  RISK_SCORE_URL,
} from '../assets/data/requestUrls';

const cors = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

/* 위험도 점수 요청 */
export const fetchRiskScore = async (userDistrict: string) => {
  try {
    const riskScoreRes = await cors.get(`${RISK_SCORE_URL}${userDistrict}`);
    return riskScoreRes;
  } catch (error) {
    console.log(error);
  }
};

/* 위험도 세부 정보 요청 */
export const fetchRiskScoreDetail = async (userDistrict: string) => {
  try {
    const riskScoreDetailRes = await cors.get(
      `${RISK_SCORE_DETAIL_URL}${userDistrict}`
    );
    return riskScoreDetailRes;
  } catch (error) {
    console.log(error);
  }
};
