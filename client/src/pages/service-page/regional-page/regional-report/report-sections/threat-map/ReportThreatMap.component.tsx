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
  DescriptionSection,
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
import {
  DescName,
  FigureTitle,
} from '../../../regional-shops/regional-delivery/delivery-shops-detail/RegionalDeliveryShopDetail.styles';

interface IProps {
  location: string;
  score: any;
  population: number;
  family: number;
  facillity: number;
  rate: number;
  stack: number;
}

export const ReportThreatMap: React.FC<IProps> = ({
  location,
  score,
  population,
  family,
  facillity,
  children,
  rate,
  stack,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <DescriptionSection>
        <GraphContainer>
          <ReportSubtitle>내 행정구 위험도 지도</ReportSubtitle>
          {children}
        </GraphContainer>
        <ReportSubtitle>
          <ReportDesc>
            파란색 테두리로 표시된 당신의 행정구 현재 위험도는 {score}점,
          </ReportDesc>
          <ReportDesc>{riskScoreParser(score)}등급은 입니다.</ReportDesc>
          {score >= 60 ? (
            <ReportDesc>
              오늘은 배달날입니다. 얌전히 집콕하고 식사하시지요!
            </ReportDesc>
          ) : (
            <ReportDesc>
              오늘은 외식 가능날입니다. 기분전환 겸 간만에 외식 한번 할까요?
            </ReportDesc>
          )}
          <AddOnButton onClick={handleOpen}>
            위험도 산출 방식이 궁금하다면
          </AddOnButton>
        </ReportSubtitle>
      </DescriptionSection>
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
            <ContentDivider />
            <AddOnDesc>
              <AddOnName>내 지역</AddOnName>: "{location}"
            </AddOnDesc>
            <AddOnDesc>
              <AddOnName>종합 위험도 점수</AddOnName>: {score} 점
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
              이후 3일 동안의 코로나 증감률 예측치는
              <DescName> {rate}%</DescName> 입니다.
            </RateDesc>
            <ElementDescSection>
              <RateSection>
                <AddOnDesc>
                  <DescName>코로나 누적지수</DescName>: {stack}
                </AddOnDesc>
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
            <FigureTitle>Prophet을 사용한 예상/학습 결과 그래프</FigureTitle>
          </AddOn>
        </>
      )}
    </>
  );
};
