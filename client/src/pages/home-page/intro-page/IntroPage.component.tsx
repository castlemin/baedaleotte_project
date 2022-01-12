import React from 'react';
import {
  IntroMainContainer,
  IntroSection,
  IntroTitle,
} from './IntroPage.styles';

const IntroPage: React.FC = () => {
  return (
    <IntroMainContainer>
      <article>
        <IntroTitle>
          오늘 코로나 때문에 외식을 할지, 배달음식을 먹을지 고민하시나요?
        </IntroTitle>
        <IntroSection>
          <p>
            배달어때? 는 최근 5일 간의 신규 코로나 확진자수, + 3일 간의 코로나
            증감 예측치, 당신의 행정구 생활인구, 행정구 평균가구 점수,
            다중이용시설 분포 정도를 분석해 외식날인지 배달날인지 알려드립니다.
          </p>
        </IntroSection>
      </article>
    </IntroMainContainer>
  );
};

export default IntroPage;
