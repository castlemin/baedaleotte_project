import styled, { css } from 'styled-components';
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
`;

export const TitleContainer = styled.h1`
  font-size: 60px;
  text-align: right;
  margin: 40px 40px;
  animation: fadein 2s;
`;

export const SubtitleContainer = styled.h2<Props>`
  font-size: 40px;
  font-weight: bold;
  margin: 0 40px 10px 0;
  text-align: right;
  animation: ${({ aniLevitate }: Props) =>
    aniLevitate ? `fadein 2s` : 'none'};
`;

export const DescContainer = styled.span<Props>`
  font-size: 30px;
  font-weight: bold;
  margin: 0 40px 10px 0;
  text-align: right;
  transform: ${({ position, toLeft, toRight }: Props) =>
    toLeft
      ? `translateX(${-position})`
      : toRight
      ? `translateX(${position})`
      : null};
  animation: ${({ aniLevitate }: Props) =>
    aniLevitate ? `pop-up 1s ease-in-out` : 'none'};
  
  opacity: ${({ position, fadeIn }: Props) =>
    fadeIn ? position - 50 / 70 : 1}}
`;

export const StartButton = styled.button`
  width: 120px;
  height: 60px;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 2px 1px 1px darkgrey;
  align-self: center;
  z-index: 50;
  :hover {
    transition: ease-in 185ms;
    background-color: darkgrey;
    box-shadow: 1px 2px 1px 1px grey;
    border-color: whear;
    color: white;
  }
`;

export const RegIntroContainer = styled.div`
  ${pageDefault}
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
