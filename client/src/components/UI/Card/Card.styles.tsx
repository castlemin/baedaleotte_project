import styled, { css } from 'styled-components';

interface Props {
  serviceStart?: boolean;
  shop?: boolean;
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

  ${({ shop, serviceStart }: Props) =>
    shop &&
    css`
      height: 22rem;
      width: 20rem;
      flex-direction: column-reverse;

      &:hover {
        transition: all 200ms ease;
        cursor: pointer;
        transform: scale(1.03);
      }
    `};
`;

/* height: -moz-fit-content;
  width: 45rem; */
