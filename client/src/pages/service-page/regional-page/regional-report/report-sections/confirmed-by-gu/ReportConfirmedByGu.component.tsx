import React from 'react';
import { ReportDesc } from '../total-confirmed/ReportTotalConfirmed.styles';
import {
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportConfirmedByGu.styles';

interface IProps {
  regionRate: number;
  score: string;
}

export const ReportConfirmedByGu: React.FC<IProps> = ({
  score,
  regionRate,
  children,
}) => {
  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>행정구별 확진자 현황</ReportSubtitle>
        {children}
      </GraphContainer>
      <ReportSubtitle>
        {Number(score) >= 60 ? (
          <ReportDesc>
            당신의 행정구에는 확진자들이 득세하고 있습니다.
          </ReportDesc>
        ) : (
          <>
            <ReportDesc>
              당신의 행정구는 다른 행정구보다 상대적으로 안전합니다.
            </ReportDesc>
            <ReportDesc>
              해당 지역구의 확진자는 서울 전체 확진자의 {regionRate} % 입니다
            </ReportDesc>
          </>
        )}
      </ReportSubtitle>
    </DescriptionSection>
  );
};
