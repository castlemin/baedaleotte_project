import styled, { css } from 'styled-components';

interface Props {
  service?: boolean;
  report?: boolean;
}

export const TitleContainer = styled.h1`
  font-size: 60px;
  text-align: center;
  line-height: 40px;
  animation: fadein 2s;
  word-break: keep-all;
`;

export const SubtitleContainer = styled.h2<Props>`
  font-size: 30px;
  font-weight: bold;
  line-height: 40px;
  word-break: keep-all;
  ${({ service }: Props) =>
    service &&
    css`
      line-height: 60px;
    `}
  ${({ report }: Props) =>
    report &&
    css`
      line-height: 20px;
    `}
`;

export const DescContainer = styled.span<Props>`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  word-break: keep-all;
  ${({ service }: Props) =>
    service &&
    css`
      font-size: 20px;
      margin: 0 46px;
    `}
`;
