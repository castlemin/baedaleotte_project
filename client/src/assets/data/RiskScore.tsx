import { useEffect, useState } from 'react';
import axios from 'axios';

export const riskScore = async () => {
  const url = 'http://111.67.218.43:5000/data/get_risk_score';
  const response = await axios.get(url);
  console.log(response.data);
};
