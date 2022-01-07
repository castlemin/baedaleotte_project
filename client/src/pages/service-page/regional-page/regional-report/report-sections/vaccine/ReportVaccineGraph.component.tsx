import React from 'react';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportVaccineGraph.styles';

import { VaccineGraph } from '../../../../../../assets/data/Graphs/VaccineGraph';
import { RiskScore } from '../../../../../../assets/data/RiskScore';

export const ReportVaccineGraph: React.FC = () => {
  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>서울시 백신 접종률</ReportSubtitle>
        <VaccineGraph />
      </GraphContainer>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 <RiskScore />
        점, '이불밖은 위험해'입니다.
      </ReportSubtitle>
    </DescriptionSection>
  );
};
