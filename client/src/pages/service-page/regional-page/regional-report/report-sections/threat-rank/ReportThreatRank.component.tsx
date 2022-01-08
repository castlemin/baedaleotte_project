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
        <p>현재 당신의 행정구의 위험도 순위는 {score}위 입니다.</p>
        <p>서울시 내 타 행정구 대비 하위권에 속합니다.</p>
        <p>그래도 외출 시엔, 방역 수칙을 철저히 지켜 지역사회를 보호합시다.</p>
      </ReportSubtitle>
      <GraphContainer>
        <ReportSubtitle>내 행정구 위험도 순위</ReportSubtitle>
        <RankGraph />
      </GraphContainer>
    </DescriptionSection>
  );
};
