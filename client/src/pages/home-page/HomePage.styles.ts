import styled from 'styled-components';
import {
  pageDefault,
  customAnimation,
} from '../../components/UI/global/css.styles';

interface Props {
  position: number;
  toLeft?: boolean;
  toRight?: boolean;
  fadeIn?: boolean;
  aniLevitate?: boolean;
}

export const HomePageContainer = styled.div`
  ${pageDefault}
  ${customAnimation}
  background-image: linear-gradient(rgba(244, 255, 252, 0), rgb(238, 253, 250), rgb(235, 252, 248));
`;

export const ContentsContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 160px;
  margin: 0 10px 0 100px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.h1`
  font-size: 3rem;
  animation: fadein 2s;
`;

export const SubtitleContainer = styled.h2<Props>`
  font-size: 2.5rem;
  font-weight: bold;
  animation: ${({ aniLevitate }: Props) =>
    aniLevitate ? `fadein 2s` : 'none'};
`;

export const DescContainer = styled.span<Props>`
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  transform: ${({ position, toLeft, toRight }: Props) =>
    toLeft
      ? `translateX(${-position}px)`
      : toRight
      ? `translateX(${position}px)`
      : null};
  animation: ${({ aniLevitate }: Props) =>
    aniLevitate ? `pop-up 1s ease-in-out` : 'none'};
  
  opacity: ${({ position, fadeIn }: Props) =>
    fadeIn ? position - 50 / 70 : 1}}
`;

export const StartButton = styled.button`
  background-color: white;
  margin-top: 54px;
  width: 248px;
  height: 64px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 2px 1px 1px darkgrey;
  postition: absolute;
  box-sizing: border-box;
  padding: 0;
  :hover {
    background-color: #88aed0;
    transition: ease-in 185ms;
    box-shadow: 1px 2px 1px 1px grey;
    border-color: wheat;
    color: white;
  }
`;

export const RegIntroContainer = styled.div`
  ${pageDefault}
  background-color: #fffcf5;
`;

export const PrefIntroContainer = styled.div`
  ${pageDefault}
`;

export const TeamIntroContainer = styled.div`
  ${pageDefault}
`;

export const ScrollToTopBtn = styled.button`
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  line-height: 48px;
  width: 48px;
  margin: auto;

  /* place it at the bottom right corner */
  position: fixed;
  bottom: 120px;
  right: 20px;

  /* keep it at the top of everything else */
  z-index: 100;

  /* hide with opacity */
  opacity: 1;

  /* also add a translate effect */
  transform: translateY(100px);
  transition: all 0.5s ease;
`;

/* .showBtn {
  opacity: 1;
  transform: translateY(0);
} */
