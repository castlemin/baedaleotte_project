import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/UI/header/Header.component';
import { TitleContainer } from './RegionalPage.styles';

const RegionalHome: React.FC = () => {
  const [covidData, setCovidData] = useState({});

  useEffect(() => {
    const fetchCovidData = async () => {
      const res = await axios.get('/corona_total');
      const data = await res.data;
      setCovidData(data);
    };
    fetchCovidData();
  }, []);

  return (
    <div>
      <Header />
      <TitleContainer>지역별 추천 서비스 페이지입니다.</TitleContainer>
      <div></div>
    </div>
  );
};

export default RegionalHome;
