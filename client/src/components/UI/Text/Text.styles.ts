import styled, { css } from 'styled-components';

interface Props {
  service?: boolean;
  report?: boolean;
}

export const TitleContainer = styled.h1`
  font-size: 60px;
  text-align: center;
  margin: 40px 40px;
  animation: fadein 2s;
  word-break: keep-all;
`;

export const SubtitleContainer = styled.h2<Props>`
  font-size: 40px;
  font-weight: bold;
  margin: 0 40px 10px 0;
  word-break: keep-all;
  ${({ service }: Props) =>
    service &&
    css`
      font-size: 30px;
      margin: 60px 20px;
    `}
  ${({ report }: Props) =>
    css`
      margin: 20px 20px;
    `}
`;

export const DescContainer = styled.span<Props>`
  position: relative;
  font-size: 30px;
  font-weight: bold;
  word-break: keep-all;
  ${({ service }: Props) =>
    service &&
    css`
      font-size: 20px;
      margin: 0 46px;
    `}
`;
