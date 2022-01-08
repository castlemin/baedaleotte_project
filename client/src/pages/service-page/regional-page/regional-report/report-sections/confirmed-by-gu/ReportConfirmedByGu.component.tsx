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
        {score >= 60 ? (
          <p>당신의 행정구에는 확진자들이 득세하고 있습니다.</p>
        ) : (
          <>
            <p>당신의 행정구는 다른 행정구보다 상대적으로 안전합니다.</p>
            <p>다른 행정구 대비 {score} 퍼센트 확진자 비율이 낮습니다.</p>
          </>
        )}
      </ReportSubtitle>
    </DescriptionSection>
  );
};
