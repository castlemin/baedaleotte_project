import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/UI/header/Header.component';
import { ReactComponent as MAIN_IMG } from '../../assets/images/on_the_way.svg';
import { ReactComponent as INTRO_IMG } from '../../assets/images/takeout_boxes.svg';
import IntroLottie from '../../components/UI/IntroLottie/IntroLottie';
import {
  HomePageContainer,
  ContentsContainer,
  TextWrapper,
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
        <ContentsContainer>
          <IntroLottie />
          <TextWrapper>
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
            <StartButton
              onClick={() => {
                navigate('/service');
              }}
            >
              바로 시작하기!
            </StartButton>
          </TextWrapper>
        </ContentsContainer>
      </HomePageContainer>
      <RegIntroContainer
        style={{
          backgroundPositionY: position / 2,
        }}
      >
        <ContentsContainer>
          <MAIN_IMG
            style={{
              margin: '40px 0 auto',
              marginLeft: '40px',
              width: '100%',
            }}
          />
          <TextWrapper>
            <TitleContainer>집콕 배달 추천</TitleContainer>
            <SubtitleContainer position={position}>
              오늘이 나가먹을 상인가?!
            </SubtitleContainer>
            <DescContainer position={position}>
              지역의 안전도를 확인하세요.
            </DescContainer>
            <DescContainer position={position}>
              그리고, 오늘이 외식날인지 파악하세요.
            </DescContainer>
            <DescContainer position={position}>
              배달날인지 파악하세요.
            </DescContainer>
          </TextWrapper>
        </ContentsContainer>
      </RegIntroContainer>
      <PrefIntroContainer
        style={{
          backgroundPositionY: position / -2,
        }}
      >
        <ContentsContainer>
          <INTRO_IMG
            style={{ margin: '40px 0 auto', marginLeft: '40px', width: '100%' }}
          />
          <TextWrapper>
            <TitleContainer>배달 음식 취향 테스트</TitleContainer>
            <SubtitleContainer position={position}>
              나는 내 뱃고래를 더 알고 싶다
            </SubtitleContainer>
            <DescContainer position={position}>
              지금 먹고 싶은 배달음식을 찾아보세요.
            </DescContainer>
            <DescContainer position={position}>
              그리고, 성향에 따라 배달음식 추천을 받아보세요.
            </DescContainer>
            <DescContainer position={position}>
              한끼의 만족을 위해.
            </DescContainer>
          </TextWrapper>
        </ContentsContainer>
      </PrefIntroContainer>
      <TeamIntroContainer>
        <ScrollToTopBtn onClick={onScrollToTop}>위로</ScrollToTopBtn>
      </TeamIntroContainer>
    </>
  );
};

export default HomePage;
