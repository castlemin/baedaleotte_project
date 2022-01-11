import React from 'react';
import { ReportDesc } from '../total-confirmed/ReportTotalConfirmed.styles';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportConfirmedByGu.styles';

interface IProps {
  position: number;
  regionRate: number;
  rank: number;
}

export const ReportConfirmedByGu: React.FC<IProps> = ({
  position,
  regionRate,
  children,
  rank,
}) => {
  return (
    <DescriptionSection style={{ opacity: (position - 2900) / 80 }}>
      <GraphContainer>
        <ReportSubtitle>행정구별 확진자 현황</ReportSubtitle>
        {children}
      </GraphContainer>
      <ReportSubtitle>
        {rank < 25 / 2 ? (
          <>
            <ReportDesc style={{ opacity: (position - 2900) / 80 }}>
              당신의 행정구에는 확진자들이 부쩍 득세하고 있습니다.
            </ReportDesc>
            <ReportDesc style={{ opacity: (position - 2950) / 80 }}>
              해당 행정구의 확진자는 서울 전체 확진자의 {regionRate} % 입니다
            </ReportDesc>
          </>
        ) : (
          <>
            <ReportDesc style={{ opacity: (position - 2900) / 80 }}>
              당신의 행정구는 다른 행정구보다 상대적으로 안전합니다.
            </ReportDesc>
            <ReportDesc style={{ opacity: (position - 2950) / 80 }}>
              해당 행정구의 확진자는 서울 전체 확진자의 {regionRate} % 입니다
            </ReportDesc>
          </>
        )}
      </ReportSubtitle>
    </DescriptionSection>
  );
};
