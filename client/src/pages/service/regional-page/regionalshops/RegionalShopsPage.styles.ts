import styled, { css } from 'styled-components';

interface Props {
  url?: string;
}

export const ShopListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

export const ShopTitleContainer = styled.p`
  height: fit-content;
`;

export const ShopDescContainer = styled.p`
  height: fit-content;
`;
