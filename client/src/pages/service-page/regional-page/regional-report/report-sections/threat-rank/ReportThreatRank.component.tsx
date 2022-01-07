import React from 'react';

import {
  DescriptionSection,
  ReportSubtitle,
  GraphContainer,
} from './ReportThreatRank.styles';
import { RankGraph } from '../../../../../../assets/data/Graphs/RankGraph';
import { RiskScore } from '../../../../../../assets/data/RiskScore';
import { riskScoreParser } from '../../../../../../assets/data/riskScoreParser';

export const ReportThreatRank: React.FC = () => {
  const score = RiskScore();
  return (
    <DescriptionSection>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 {riskScoreParser(score)}입니다.
      </ReportSubtitle>
      <GraphContainer>
        <ReportSubtitle>내 행정구 위험도 순위</ReportSubtitle>
        <RankGraph />
      </GraphContainer>
    </DescriptionSection>
  );
};
