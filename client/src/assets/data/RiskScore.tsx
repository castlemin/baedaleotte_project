import { useEffect, useState } from 'react';
import axios from 'axios';

const RiskScore = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    async function getScore() {
      const url = 'http://111.67.218.43:5000/data/get_risk_score';
      const response = await axios.get(url);
      setScore(response.data);
    }
    getScore();
  }, []);
  return <span>{score}</span>;
};

export default RiskScore;
