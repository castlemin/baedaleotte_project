import { useEffect, useState } from 'react';
import axios from 'axios';

export const RiskScore = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetchScore = async () => {
      const url =
        'https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/data/risk_score?region=용산구';
      const response = await axios.get(url);
      setScore(response.data);
    };
    fetchScore();
  }, []);
  return <span>{score}</span>;
};
