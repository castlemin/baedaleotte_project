import React from 'react';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportVaccineGraph.styles';

import { VaccineGraph } from '../../../../../../assets/data/Graphs/VaccineGraph';
import { RiskScore } from '../../../../../../assets/data/RiskScore';
import { workerData } from 'worker_threads';
import { ReportDesc } from '../threat-rank/ReportThreatRank.styles';

interface IProps {
  vacRate: number;
  date: string;
}

export const ReportVaccineGraph: React.FC<IProps> = ({
  vacRate,
  date,
  children,
}) => {
  const score = RiskScore();

  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>서울시 백신 접종률</ReportSubtitle>
        {children}
      </GraphContainer>
      <ReportSubtitle>
        <ReportDesc>{date}일 기준으로,</ReportDesc>
        <ReportDesc>
          현재 서울시 전체의 2차 백신 접종률은 {vacRate}%입니다.
        </ReportDesc>
      </ReportSubtitle>
    </DescriptionSection>
  );
};
