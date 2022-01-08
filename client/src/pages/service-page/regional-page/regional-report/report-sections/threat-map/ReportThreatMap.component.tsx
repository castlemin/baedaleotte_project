import React, { useState } from 'react';
import {
  AddOn,
  AddOnButton,
  AddOnDesc,
  AddOnTitle,
  DescriptionSection,
  GraphContainer,
  ReportSubtitle,
} from './ReportThreatMap.styles';

import { GuMap } from '../../../../../../assets/data/Graphs/GuMap';
import { RiskScore } from '../../../../../../assets/data/RiskScore';
import { Card } from '../../../../../../components/UI/Card/Card.styles';
import { riskScoreParser } from '../../../../../../assets/data/riskScoreParser';
import { useRecoilValue } from 'recoil';
import { userGu } from '../../../../../../store/store';
import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';

export const ReportThreatMap: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ReportSubtitle>내 행정구 위험도 지도</ReportSubtitle>
      <AddOnButton onClick={handleOpen}>
        위험도 산출 방식이 궁금하다면
      </AddOnButton>

      <ReportSubtitle>
        현재 당신의 지역 위험도는 점,
        <br /> 등급은 입니다.
        <br />
      </ReportSubtitle>

      {open && (
        <>
          <BackDrop onCancel={handleOpen} />
          <AddOn addOnOpen={open}>
            <AddOnTitle>코로나 위험도 산출 공식</AddOnTitle>
            <AddOnDesc>
              최근 5일 간의 신규 코로나 확진자 (40점) + 3일 간의 코로나 증감
              예측치 (30점) + 생활인구 점수 (10점) + 평균가구 점수(15점) +
              다중이용시설 분포 점수 (5점)
            </AddOnDesc>
            <hr />
            <p>
              <b>내 지역</b>:
            </p>
            <p>
              <b>위험도 점수</b>:
            </p>
            <div>
              <p>
                <b>등급표</b>
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>30점 미만 = {riskScoreParser(29)}</li>
                <li>60점 미만 = {riskScoreParser(59)}</li>
                <li>60점 이상 = {riskScoreParser(60)}</li>
              </ul>
            </div>
            <hr />
            <p style={{ textAlign: 'left' }}>
              이후 3일 동안의 코로나 증감률 예측치 ={' '}
            </p>
            <div style={{ display: 'flex' }}>
              <Card style={{ height: '150px', width: '240px' }}></Card>
              <Card style={{ height: '150px', width: '240px' }}></Card>
            </div>
          </AddOn>
        </>
      )}
    </>
  );
};
