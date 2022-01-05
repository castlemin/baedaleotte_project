import React from 'react';

import {
  DescriptionSection,
  ReportSubtitle,
  GraphContainer,
} from './ReportTotalConfirmed.styles';
import { ConfirmedGraph } from '../../../../../../assets/data/Graphs/ConfirmedGraph';

export const ReportTotalConfirmed: React.FC = () => {
  return (
    <DescriptionSection>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 점, '이불밖은 위험해'입니다.
      </ReportSubtitle>
      <GraphContainer>
        <ReportSubtitle>서울시 전체 확진자 현황</ReportSubtitle>
        <ConfirmedGraph />
      </GraphContainer>
    </DescriptionSection>
  );
};
