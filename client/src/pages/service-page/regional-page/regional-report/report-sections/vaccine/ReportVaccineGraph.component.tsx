import React from 'react';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportVaccineGraph.styles';

import { VaccineGraph } from '../../../../../../assets/data/Graphs/VaccineGraph';
import { RiskScore } from '../../../../../../assets/data/RiskScore';

export const ReportVaccineGraph: React.FC = () => {
  const score = RiskScore();

  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>서울시 백신 접종률</ReportSubtitle>
        <VaccineGraph />
      </GraphContainer>
      <ReportSubtitle>
        <p>현재 서울시의 백신 접종률은 {score}%입니다.</p>
      </ReportSubtitle>
    </DescriptionSection>
  );
};
