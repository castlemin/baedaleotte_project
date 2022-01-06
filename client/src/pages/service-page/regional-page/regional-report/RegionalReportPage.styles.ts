import styled from 'styled-components';
import { customAnimation } from '../../../../components/UI/global/css.styles';

export const ReportContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(
    rgba(244, 255, 252, 0),
    rgb(238, 253, 250),
    rgb(235, 252, 248)
  );
`;

export const ReportTitle = styled.h1`
  font-size: 40px;
  text-align: center;
`;

export const ReportSubtitle = styled.h2`
  font-size: 24px;
  text-align: center;
  word-break: all;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const NextButton = styled.button`
  background-color: white;
  margin: 40px auto;
  padding: 5px 20px;
  width: 200px;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 2px 1px 1px darkgrey;
  postition: absolute;
  box-sizing: border-box;

  + button {
    margin-left: 20px;
  }

  :hover {
    background-color: #88aed0;
    transition: ease-in 185ms;
    box-shadow: 1px 2px 1px 1px grey;
    border-color: wheat;
    color: white;
  }
`;
