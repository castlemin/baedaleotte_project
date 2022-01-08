import React from 'react';

import {
  DescriptionSection,
  ReportSubtitle,
  GraphContainer,
} from './ReportTotalConfirmed.styles';
import { ConfirmedGraph } from '../../../../../../assets/data/Graphs/ConfirmedGraph';

interface IProps {
  totalNum: number;
  addNum: number;
  date: string;
}

export const ReportTotalConfirmed: React.FC<IProps> = ({
  totalNum,
  addNum,
  date,
}) => {
  return (
    <DescriptionSection>
      <ReportSubtitle>
        <p>{date}일 기준으로,</p>
        <p>서울시 전체 확진자 수는 {totalNum}명이며,</p>
        <p>서울시 추가 확진자 수는 {addNum}명입니다.</p>
      </ReportSubtitle>
      <GraphContainer>
        <ReportSubtitle>서울시 전체 확진자 현황</ReportSubtitle>
        <ConfirmedGraph />
      </GraphContainer>
    </DescriptionSection>
  );
};
