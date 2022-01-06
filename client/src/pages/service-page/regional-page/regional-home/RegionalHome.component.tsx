import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../../components/UI/header/Header.component';

const RegionalHome: React.FC = () => {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    const fetchCovidData = async () => {
      const res = await axios.get('/corona_total/');
      const data = await res.data;
      setCovidData(data);
    };
    fetchCovidData();
  }, []);

  console.log(covidData);

  return (
    <div>
      <Header />
      <div>
        {/* {covidData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))} */}
      </div>
    </div>
  );
};

export default RegionalHome;
