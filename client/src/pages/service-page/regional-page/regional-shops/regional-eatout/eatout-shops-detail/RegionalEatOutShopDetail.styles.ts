import styled, { css } from 'styled-components';

interface Props {
  imgUrl: string;
}

export const CloseBtn = styled.span`
  font-size: 25px;
  cursor: pointer;
  position: absolute;
  display: block;
  right: 10px;
  top: 0;
`;

export const DetailCardContainer = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  width: 40rem;
  z-index: 10;
  position: absolute;
  top: 5vh;
  left: calc(50% - 20rem);
`;

export const DetailDescContainer = styled.div``;

export const DetailCategoryList = styled.ul`
  margin-top: 0;
  padding: 0;
`;

export const DetailDescListItem = styled.li`
  list-style: none;
`;

export const DetailShopTitle = styled.h2``;

export const DetailItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 40px;
`;

export const DetailImage = styled.div`
  height: 300px;
  width: 300px;
  ${({ imgUrl }: Props) => css`
    background-image: url(${imgUrl});
  `}
  background-size: cover;
  background-repeat: no-repeat;
`;
