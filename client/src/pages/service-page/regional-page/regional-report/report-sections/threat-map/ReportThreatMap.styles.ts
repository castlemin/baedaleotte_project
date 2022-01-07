import styled, { css } from 'styled-components';

interface Props {
  addOnOpen: boolean;
}

export const DescriptionSection = styled.section`
  display: flex;
  align-items: center;
`;

export const AddOnButton = styled.button`
  background-color: white;
  width: 248px;
  height: 64px;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 2px 1px 1px darkgrey;
  postition: absolute;
  box-sizing: border-box;
  padding: 0;
  margin-bottom: 30px;
  :hover {
    background-color: #88aed0;
    transition: ease-in 185ms;
    box-shadow: 1px 2px 1px 1px grey;
    border-color: wheat;
    color: white;
  }
`;

export const GraphContainer = styled.div`
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  height: -moz-fit-content;
  width: 45rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AddOn = styled.div<Props>`
  display: none;
  height: fit-content;
  ${({ addOnOpen }: Props) =>
    addOnOpen &&
    css`
      display: block;
    `}
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
