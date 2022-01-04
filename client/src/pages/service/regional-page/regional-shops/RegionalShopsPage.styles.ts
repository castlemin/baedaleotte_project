import styled, { css } from 'styled-components';

interface Props {
  url?: string;
  isHovered?: boolean;
}

export const ShopListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  margin: 0 80px;
`;
export const ShopTitleContainer = styled.p`
  height: fit-content;
`;

export const ShopDescContainer = styled.p`
  height: fit-content;
  margin: 10px;
  display: none;
  text-align: left;
  font-size: 13px;

  > li {
    list-style: none;
  }
`;

export const FilterBtnContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const FilterBtn = styled.button`
  background-color: beige;
  width: 80px;
  height: 25px;
  font-size: 13px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 2px 1px 1px darkgrey;
  box-sizing: border-box;
  padding: 0;
  margin: 10px 5px 0 0;
  + button {
    margin: 10px 120px 0 0;
  }

  :hover {
    background-color: #88aed0;
    transition: ease-in 185ms;
    box-shadow: 1px 2px 1px 1px grey;
    border-color: wheat;
    color: white;
  }
`;

export const ShopImgContainer = styled.div<Props>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 6px 6px 0 0;

  ${({ url }: Props) =>
    css`
      background-image: url(https://www.yogiyo.co.kr/${url});
    `};
`;
