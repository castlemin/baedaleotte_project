import React from 'react';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportConfirmedByGu.styles';

import { ConfirmedByGuGraph } from '../../../../../../assets/data/Graphs/ConfirmedByGuGraph';
import { RiskScore } from '../../../../../../assets/data/RiskScore';
import { riskScoreParser } from '../../../../../../assets/data/riskScoreParser';

export const ReportConfirmedByGu: React.FC = () => {
  const score = RiskScore();

  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>행정구별 확진자 현황</ReportSubtitle>
        <ConfirmedByGuGraph />
      </GraphContainer>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 점, '이불밖은 위험해' 입니다.
      </ReportSubtitle>
    </DescriptionSection>
  );
};
