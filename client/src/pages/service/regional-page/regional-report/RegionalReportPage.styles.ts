import styled from 'styled-components';
import { customAnimation } from '../../../../components/UI/global/css.styles';

export const ReportContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const GraphConatiner = styled.div`
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  height: -moz-fit-content;
  width: 45rem;
  margin-top: 8%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const DescriptionSection = styled.section`
  margin-top: 8%;
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

export const NextButton = styled.button`
  background-color: white;
  margin: auto;
  margin-bottom: 20px;
  width: 120px;
  height: 50px;
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
