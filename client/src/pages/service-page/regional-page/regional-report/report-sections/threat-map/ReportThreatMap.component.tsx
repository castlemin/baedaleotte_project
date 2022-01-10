import React, { useState } from 'react';
import {
  AddOn,
  AddOnButton,
  AddOnCloseButton,
  AddOnDesc,
  AddOnGraphContainer,
  AddOnName,
  AddOnTitle,
  ContentDivider,
  ElementDescSection,
  GradeList,
  GradeListItem,
  GradeSection,
  GraphContainer,
  RateDesc,
  RateSection,
  ReportDesc,
  ReportSubtitle,
} from './ReportThreatMap.styles';

import { riskScoreParser } from '../../../../../../assets/data/riskScoreParser';
import BackDrop from '../../../../../../components/UI/BackDrop/BackDrop.component';
import prophet from '../../../../../../assets/images/dataset/prophet.png';
import prophet2 from '../../../../../../assets/images/dataset/prophet2.png';
import { DescName } from '../../../regional-shops/regional-delivery/delivery-shops-detail/RegionalDeliveryShopDetail.styles';

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
        <ReportDesc>현재 당신의 지역 위험도는 {score}점,</ReportDesc>
        <ReportDesc>{riskScoreParser(score)}등급은 입니다.</ReportDesc>
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
              <AddOnName>내 지역</AddOnName>: "{location}"
            </AddOnDesc>
            <AddOnDesc>
              <AddOnName>위험도 점수</AddOnName>: {score} 점
            </AddOnDesc>
            <GradeSection>
              <AddOnDesc>
                <AddOnName>등급표</AddOnName>: {riskScoreParser(score)}
              </AddOnDesc>
              <GradeList>
                <GradeListItem>30점 미만 = {riskScoreParser(29)}</GradeListItem>
                <GradeListItem>60점 미만 = {riskScoreParser(59)}</GradeListItem>
                <GradeListItem>60점 이상 = {riskScoreParser(60)}</GradeListItem>
              </GradeList>
            </GradeSection>
            <ContentDivider />
            <RateDesc>
              이후 3일 동안의 코로나 증감률 예측치 =<DescName>{rate}%</DescName>
            </RateDesc>
            <ElementDescSection>
              <RateSection>
                <AddOnDesc>
                  <DescName>생활인구 지수</DescName>: {population}
                </AddOnDesc>
                <AddOnDesc>
                  <DescName>평균 가구 수</DescName>: {family}
                </AddOnDesc>
                <AddOnDesc>
                  <DescName>대중이용시설 분포</DescName>: {facillity}
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
