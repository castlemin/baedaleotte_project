import React, { useState } from 'react';
import {
  AddOn,
  AddOnButton,
  AddOnDesc,
  AddOnTitle,
  GraphContainer,
  ReportSubtitle,
} from './ReportThreatMap.styles';

import { Card } from '../../../../../../components/UI/Card/Card.styles';
import { riskScoreParser } from '../../../../../../assets/data/riskScoreParser';
import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
import prophet from '../../../../../../assets/images/dataset/prophet.png';
import prophet2 from '../../../../../../assets/images/dataset/prophet2.png';

interface IProps {
  location: string;
  score: any;
  population: number;
  family: number;
  facillity: number;
  rate: number;
}

export const ReportThreatMap: React.FC<IProps> = ({
  location,
  score,
  population,
  family,
  facillity,
  children,
  rate,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <GraphContainer>
        <ReportSubtitle>내 행정구 위험도 지도</ReportSubtitle>
        {children}
      </GraphContainer>
      <ReportSubtitle>
        현재 당신의 지역 위험도는 {score}점,
        <br /> {riskScoreParser(score)}등급은 입니다.
        <br />
        <AddOnButton onClick={handleOpen}>
          위험도 산출 방식이 궁금하다면
        </AddOnButton>
      </ReportSubtitle>
      {open && (
        <>
          <BackDrop onCancel={handleOpen} />
          <AddOn addOnOpen={open}>
            <div
              onClick={handleOpen}
              style={{
                position: 'absolute',
                right: '10px',
                top: '0',
                fontSize: '25px',
                cursor: 'pointer',
              }}
            >
              x
            </div>
            <AddOnTitle>코로나 위험도 산출 공식</AddOnTitle>
            <AddOnDesc>
              최근 5일 간의 신규 코로나 확진자 (40점) + 3일 간의 코로나 증감
              예측치 (30점) + 생활인구 점수 (10점) + 평균가구 점수(15점) +
              다중이용시설 분포 점수 (5점)
            </AddOnDesc>
            <hr />
            <p>
              <b>내 지역</b>: "{location}"
            </p>
            <p>
              <b>위험도 점수</b>: {score} 점
            </p>
            <div>
              <p>
                <b>등급표</b>: {riskScoreParser(score)}
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>30점 미만 = {riskScoreParser(29)}</li>
                <li>60점 미만 = {riskScoreParser(59)}</li>
                <li>60점 이상 = {riskScoreParser(60)}</li>
              </ul>
            </div>
            <hr />
            <p style={{ textAlign: 'center', fontSize: '20px' }}>
              이후 3일 동안의 코로나 증감률 예측치 =<b>{rate}%</b>
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <div>
                <p>
                  <b>생활인구 지수</b>: {population}
                </p>
                <p>
                  <b>평균 가구 수</b>: {family}
                </p>
                <p>
                  <b>대중이용시설 분포</b>: {facillity}
                </p>
              </div>
              <Card
                style={{
                  height: '270px',
                  width: '420px',
                  marginTop: 0,
                  backgroundImage: `url(${prophet})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></Card>
              <Card
                style={{
                  marginTop: 0,
                  height: '270px',
                  width: '420px',
                  backgroundImage: `url(${prophet2})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></Card>
            </div>
          </AddOn>
        </>
      )}
    </>
  );
};
