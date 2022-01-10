import React, { useState } from 'react';
import {
  AddOn,
  AddOnButton,
  AddOnCloseButton,
  AddOnDesc,
  AddOnGraphContainer,
  AddOnTitle,
  ContentDivider,
  ElementDescSection,
  GradeList,
  GradeSection,
  GraphContainer,
  RateDesc,
  RateSection,
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
        <p>현재 당신의 지역 위험도는 {score}점,</p>
        <p>{riskScoreParser(score)}등급은 입니다.</p>
        <AddOnButton onClick={handleOpen}>
          위험도 산출 방식이 궁금하다면
        </AddOnButton>
      </ReportSubtitle>
      {open && (
        <>
          <BackDrop onCancel={handleOpen} />
          <AddOn addOnOpen={open}>
            <AddOnCloseButton onClick={handleOpen}>x</AddOnCloseButton>
            <AddOnTitle>코로나 위험도 산출 공식</AddOnTitle>
            <AddOnDesc>
              최근 5일 간의 신규 코로나 확진자 (40점) + 3일 간의 코로나 증감
              예측치 (30점) + 생활인구 점수 (10점) + 평균가구 점수(15점) +
              다중이용시설 분포 점수 (5점)
            </AddOnDesc>
            <hr />
            <AddOnDesc>
              <b>내 지역</b>: "{location}"
            </AddOnDesc>
            <AddOnDesc>
              <b>위험도 점수</b>: {score} 점
            </AddOnDesc>
            <GradeSection>
              <AddOnDesc>
                <b>등급표</b>: {riskScoreParser(score)}
              </AddOnDesc>
              <GradeList>
                <li>30점 미만 = {riskScoreParser(29)}</li>
                <li>60점 미만 = {riskScoreParser(59)}</li>
                <li>60점 이상 = {riskScoreParser(60)}</li>
              </GradeList>
            </GradeSection>
            <ContentDivider />
            <RateDesc>
              이후 3일 동안의 코로나 증감률 예측치 =<b>{rate}%</b>
            </RateDesc>
            <ElementDescSection>
              <RateSection>
                <AddOnDesc>
                  <b>생활인구 지수</b>: {population}
                </AddOnDesc>
                <AddOnDesc>
                  <b>평균 가구 수</b>: {family}
                </AddOnDesc>
                <AddOnDesc>
                  <b>대중이용시설 분포</b>: {facillity}
                </AddOnDesc>
              </RateSection>
              <AddOnGraphContainer imgUrl={prophet}></AddOnGraphContainer>
              <AddOnGraphContainer imgUrl={prophet2}></AddOnGraphContainer>
            </ElementDescSection>
          </AddOn>
        </>
      )}
    </>
  );
};
