import React from 'react';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportVaccineGraph.styles';

import { ReportDesc } from '../threat-rank/ReportThreatRank.styles';

interface IProps {
  secVacRate: number;
  thrVacRate: number;
  date: string;
  position: number;
}

export const ReportVaccineGraph: React.FC<IProps> = ({
  secVacRate,
  thrVacRate,
  date,
  position,
  children,
}) => {
  return (
    <DescriptionSection style={{ opacity: (position - 1300) / 80 }}>
      <GraphContainer>
        <ReportSubtitle>서울시 백신 접종률</ReportSubtitle>
        {children}
      </GraphContainer>
      <ReportSubtitle>
        <ReportDesc>{date}일 기준으로,</ReportDesc>
        <ReportDesc style={{ opacity: (position - 1400) / 80 }}>
          현재 서울시의 2차 백신 접종률은 {secVacRate}%입니다.
        </ReportDesc>
        <ReportDesc style={{ opacity: (position - 1450) / 80 }}>
          현재 서울시의 3차 백신 접종률은 {thrVacRate}%입니다.
        </ReportDesc>
        <ReportDesc style={{ opacity: (position - 1500) / 80 }}>
          {secVacRate}% 를 따라잡을 때까지 영차 영차!
        </ReportDesc>
      </ReportSubtitle>
    </DescriptionSection>
  );
};
