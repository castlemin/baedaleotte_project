import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/UI/header/Header.component';
import {
  HomePageContainer,
  TitleContainer,
  SubtitleContainer,
  DescContainer,
  StartButton,
  RegIntroContainer,
  PrefIntroContainer,
  TeamIntroContainer,
  ScrollToTopBtn,
} from './HomePage.styles';

const HomePage: React.FC = () => {
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();

  const onScroll = () => {
    console.log(window.scrollY);
    setPosition(window.scrollY);
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <>
      <Header />
      <HomePageContainer>
        <TitleContainer>배달어때?</TitleContainer>
        <SubtitleContainer>
          거 참 오늘 배달시키기 딱 좋은 날이구나!
        </SubtitleContainer>
        <DescContainer position={position}>외식할 만큼 안전할 지</DescContainer>
        <DescContainer position={position}>
          집콕하면서 배달 시킬 지 고민될 땐
        </DescContainer>
        <DescContainer position={position}>배달어때?</DescContainer>
        <StartButton
          onClick={() => {
            navigate('/service');
          }}
        >
          바로 시작하기!
        </StartButton>
      </HomePageContainer>
      <RegIntroContainer
        style={{
          backgroundPositionY: position / 2,
        }}
      >
        <DescContainer position={position}></DescContainer>
      </RegIntroContainer>
      <PrefIntroContainer
        style={{
          backgroundPositionY: position / -2,
        }}
      >
        slide3
      </PrefIntroContainer>
      <TeamIntroContainer
        style={{
          backgroundPositionY: position / -2,
        }}
      >
        <ScrollToTopBtn onClick={onScrollToTop}>위로</ScrollToTopBtn>
      </TeamIntroContainer>
    </>
  );
};

export default HomePage;
