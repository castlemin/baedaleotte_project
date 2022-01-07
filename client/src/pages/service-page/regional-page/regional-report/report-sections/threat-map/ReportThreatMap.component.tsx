import React, { useState } from 'react';
import {
  AddOn,
  AddOnButton,
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportThreatMap.styles';

import { GuMap } from '../../../../../../assets/data/Graphs/GuMap';
import { RiskScore } from '../../../../../../assets/data/RiskScore';
import { Card } from '../../../../../../components/UI/Card/Card.styles';

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
        <AddOnButton onClick={handleOpen}>
          위험도를 산출한 방식이 궁금하다면
        </AddOnButton>
        <AddOn addOnOpen={open}>
          <h2>코로나 위험도 산출 공식</h2>
          <p style={{ wordBreak: 'keep-all' }}>
            최근 5일 간의 신규 코로나 확진자 (40점) + 3일 간의 코로나 증감
            예측치 (30점) + 생활인구 점수 (10점) + 평균가구 점수(15점) +
            다중이용시설 분포 점수 (5점)
          </p>
          <hr />
          <p>
            <b>내 지역</b>: 강남구
          </p>
          <p>
            <b>위험도 점수</b>: <RiskScore />
          </p>
          <hr />
          <p style={{ textAlign: 'left' }}>
            이후 3일 동안의 코로나 증감률 예측치 ={' '}
          </p>
          <div style={{ display: 'flex' }}>
            <Card style={{ height: '150px', width: '240px' }}></Card>
            <Card style={{ height: '150px', width: '240px' }}></Card>
          </div>
        </AddOn>
      </GraphContainer>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 <RiskScore />
        점, '이불밖은 위험해'입니다.
      </ReportSubtitle>
    </DescriptionSection>
  );
};
