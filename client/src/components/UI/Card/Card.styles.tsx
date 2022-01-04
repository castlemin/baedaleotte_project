import styled, { css } from 'styled-components';
import {
  ShopDescContainer,
  ShopTitleContainer,
} from '../../../pages/service/regional-page/regional-shops/RegionalShopsPage.styles';

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
      margin: 100px auto;
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
      width: 21rem;

      &:hover {
        transition: all 200ms ease;
        cursor: pointer;
        transform: scale(1.03);
        background-color: white;
      }
    `}

  ${({ shop }: Props) =>
    shop &&
    css`
      height: 20rem;
      width: 15rem;
      flex-direction: column-reverse;

      &:hover {
        transition: all 200ms ease;
        cursor: pointer;
        transform: scale(1.2);
        background-color: white;
      }

      &:hover ${ShopDescContainer} {
        display: block;
      }

      &: hover ${ShopTitleContainer} {
        margin: 8px 0;
        font-weight: bold;
      }
    `};
`;

/* height: -moz-fit-content;
  width: 45rem; */
