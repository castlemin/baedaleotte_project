import React, { useState } from 'react';
import {
  AddOn,
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportThreatMap.styles';

import { GuMap } from '../../../../../../assets/data/Graphs/GuMap';
import { RiskScore } from '../../../../../../assets/data/RiskScore';

export const ReportThreatMap: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <DescriptionSection>
      <GraphContainer>
        <ReportSubtitle>내 행정구 위험도 지도</ReportSubtitle>
        <GuMap />
        <button onClick={handleOpen}>위험도를 산출한 방식이 궁금하다면</button>
        <AddOn addOnOpen={open}>
          위험도는 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Culpa distinctio molestias voluptatem rem maxime assumenda neque
          dolores. Officiis animi nihil nisi, culpa inventore fugit autem
          pariatur enim, expedita obcaecati a! 과 같은 방법으로 산출되었습니다.
        </AddOn>
      </GraphContainer>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 <RiskScore />
        점, '이불밖은 위험해'입니다.
      </ReportSubtitle>
    </DescriptionSection>
  );
};
