import React from 'react';
import Header from '../../components/UI/header/header.components';
import { HomePageContainer, TitleContainer } from './homepage.styles';

const HomePage = () => (
  <>
    <Header />
    <HomePageContainer>
      <TitleContainer>배달어때?</TitleContainer>
    </HomePageContainer>
  </>
);

export default HomePage;
