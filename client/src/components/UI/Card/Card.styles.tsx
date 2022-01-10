import styled, { css } from 'styled-components';

interface Props {
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

  ${({ regionalReport }: Props) =>
    regionalReport &&
    css`
      margin: 100px auto;
    `}
`;

/* height: -moz-fit-content;
  width: 45rem; */