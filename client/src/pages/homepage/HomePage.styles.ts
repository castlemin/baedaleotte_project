import styled, { css } from 'styled-components';

export const pageDefault = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

type Props = {
  position: number;
};

export const HomePageContainer = styled.div`
  ${pageDefault}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const TitleContainer = styled.h1`
  font-size: 60px;
  text-align: center;
  animation: fadein 2s;
`;

export const SubtitleContainer = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin: 0 40px 10px 0;
  text-align: right;
`;

export const DescContainer = styled.span<Props>`
  font-size: 30px;
  font-weight: bold;
  margin: 0 40px 10px 0;
  text-align: right;
`;

export const StartButton = styled.button`
  width: 120px;
  height: 60px;
  border: none;
`;

export const RegIntroContainer = styled.div`
  ${pageDefault}
  background-image: url('../../assets/img1.jpg');
  background-position: center;
  background-repeat: no-repeat;
`;

export const PrefIntroContainer = styled.div`
  ${pageDefault}
  background-color: yellow;
`;

export const TeamIntroContainer = styled.div`
  ${pageDefault}
  background-color: green;
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
