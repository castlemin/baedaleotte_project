import { useEffect, useState } from 'react';
import axios from 'axios';
import { RISK_SCORE_URL } from './requestUrls';

export const RiskScore = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetchScore = async () => {
      const response = await axios.get(RISK_SCORE_URL);
      setScore(response.data);
    };
    fetchScore();
  }, []);
  return <span>{score}</span>;
};
