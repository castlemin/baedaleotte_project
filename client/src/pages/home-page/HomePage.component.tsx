import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/UI/header/Header.component';
import { ReactComponent as MAIN_IMG } from '../../assets/images/on_the_way.svg';
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
import Loading from '../../components/UI/loading/Loading.component';

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
        <Loading />
        <TitleContainer>배달어때?</TitleContainer>
        <SubtitleContainer aniLevitate position={position}>
          오늘 배달시키기 딱 좋은 날이구나!
        </SubtitleContainer>
        <DescContainer aniLevitate position={position}>
          외식할 만큼 안전할 지
        </DescContainer>
        <DescContainer aniLevitate position={position}>
          집콕하면서 배달 시킬 지 고민될 땐
        </DescContainer>
        <DescContainer aniLevitate position={position}>
          배달어때?
        </DescContainer>
        <MAIN_IMG style={{ position: 'absolute', width: '40%' }} />
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
        <SubtitleContainer position={position}>
          오늘이 나가먹을 상인가?!
        </SubtitleContainer>
        <DescContainer toLeft position={position}>
          지역의 안전도를 확인하세요.
        </DescContainer>
        <DescContainer toLeft position={position}>
          그리고, 오늘이 외식날인지 파악하세요.
        </DescContainer>
        <DescContainer toLeft position={position}>
          배달날인지 파악하세요.
        </DescContainer>
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
