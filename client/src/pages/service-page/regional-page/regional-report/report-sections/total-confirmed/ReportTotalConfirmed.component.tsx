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
        <p>서울시 전체 확진자는 현재 명입니다.</p>
      </ReportSubtitle>
      <GraphContainer>
        <ReportSubtitle>서울시 전체 확진자 현황</ReportSubtitle>
        <ConfirmedGraph />
      </GraphContainer>
    </DescriptionSection>
  );
};
