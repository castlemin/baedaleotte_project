import React from 'react';

import {
  DescriptionSection,
  ReportSubtitle,
  GraphContainer,
} from './ReportTreatRank.styles';
import { RankGraph } from '../../../../../../assets/data/Graphs/RankGraph';

export const ReportTreatRank: React.FC = () => {
  return (
    <DescriptionSection>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 점, '이불밖은 위험해'입니다.
      </ReportSubtitle>
      <GraphContainer>
        <ReportSubtitle>내 행정구 위험도 순위</ReportSubtitle>
        <RankGraph />
      </GraphContainer>
    </DescriptionSection>
  );
};
