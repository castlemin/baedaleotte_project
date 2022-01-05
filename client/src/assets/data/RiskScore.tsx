import { useEffect, useState } from 'react';
import axios from 'axios';

export const RiskScore = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetchScore = async () => {
      const url = 'http://111.67.218.43:5000/data/get_risk_score';
      const response = await axios.get(url);
      setScore(response.data);
    };
    fetchScore();
  }, []);
  return <span>{score}</span>;
};
