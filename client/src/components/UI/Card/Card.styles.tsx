import styled, { css } from 'styled-components';
import {
  ShopDescContainer,
  ShopTitleContainer,
} from '../../../pages/service-page/regional-page/regional-shops/RegionalShopsPage.styles';

interface Props {
  serviceStart?: boolean;
  shop?: boolean;
  category?: boolean;
  regionalReport?: boolean;
  url?: string;
}

export const Card = styled.div<Props>`
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  height: -moz-fit-content;
  width: 45rem;
  margin-top: 8%;
  display: flex;
  flex-direction: column;

  ${({ serviceStart }: Props) =>
    serviceStart &&
    css`
      margin: 50px auto 0;
    `}

  ${({ regionalReport }: Props) =>
    regionalReport &&
    css`
      margin: 100px auto;
    `}

  ${({ category }: Props) =>
    category &&
    css`
      height: 20rem;
      width: 20rem;

      &:hover {
        transition: all 200ms ease;
        cursor: pointer;
        transform: scale(1.03);
        background-color: white;
      }
    `}
`;

/* height: -moz-fit-content;
  width: 45rem; */
