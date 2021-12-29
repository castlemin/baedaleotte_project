import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/UI/header/Header.component';
import { HomePageContainer, TitleContainer } from './HomePage.styles';
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [ref, inView] = useInView();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const APICall = await axios.get(
  //       'https://jsonplaceholder.typicode.com/users'
  //     );
  //     const response = await APICall.data;
  //     setData(response);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Header />
      <TitleContainer style={{ textAlign: 'center' }}>배달어때?</TitleContainer>
      <HomePageContainer>
        {/* <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul> */}
        <h2>메인 소개 페이지입니다.</h2>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
