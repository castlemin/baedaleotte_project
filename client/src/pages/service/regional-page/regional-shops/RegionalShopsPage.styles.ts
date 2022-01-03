import styled, { css } from 'styled-components';

interface Props {
  url?: string;
  isHovered?: boolean;
}

export const ShopListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  margin: 30px;
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
