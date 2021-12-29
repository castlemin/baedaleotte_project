import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/UI/header/header.components';
import { HomePageContainer, TitleContainer } from './homepage.styles';

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const APICall = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      const response = await APICall.data;
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <TitleContainer style={{ textAlign: 'center' }}>배달어때?</TitleContainer>
      <HomePageContainer>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
