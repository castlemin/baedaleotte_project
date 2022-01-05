import styled, { css } from 'styled-components';

interface Props {
  imgUrl: string;
}

export const CategoryListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  margin: 0 200px;
`;

export const CategoryContainer = styled.div`
  ${({ imgUrl }: Props) =>
    css`
      background-image: url(${imgUrl});
    `}
  background-size: cover;
  background-position: center;
  height: 200px;
  width: 200px;
  margin: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  cursor: pointer;
`;

export const CategoryTitle = styled.h3`
  background-color: black;
  color: white;
  margin-top: 0;
  text-align: center;
  border-radius: 6px 6px 0 0;
`;

export const PageTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

export const SelectedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  width: 230px;
  margin: 20px auto;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
`;

export const SelectedCategory = styled.div`
  display: inline-block;
  ${({ imgUrl }: Props) =>
    css`
      background-image: url(${imgUrl});
    `}
  background-size: cover;
  background-position: center;
  border-radius: 3px;
  height: 100px;
  width: 100px;
  margin: 5px 10px;
`;

export const SelectedTitle = styled.h3`
  background-color: black;
  color: white;
  font-size: 2px;
  margin: 0;
  border-radius: 3px 3px 0 0;
`;

export const NextButton = styled.button`
  background-color: white;
  margin-top: 54px;
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
