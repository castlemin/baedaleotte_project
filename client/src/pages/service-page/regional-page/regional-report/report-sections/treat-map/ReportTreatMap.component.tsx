import React from 'react';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportTreatMap.styles';

import { GuMap } from '../../../../../../assets/data/Graphs/GuMap';
import { RiskScore } from '../../../../../../assets/data/RiskScore';

export const ReportTreatMap: React.FC = () => {
  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>내 행정구 위험도 지도</ReportSubtitle>
        <GuMap />
        <button>위험도를 산출한 방식이 궁금하다면</button>
      </GraphContainer>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 <RiskScore />
        점, '이불밖은 위험해'입니다.
      </ReportSubtitle>
    </DescriptionSection>
  );
};
