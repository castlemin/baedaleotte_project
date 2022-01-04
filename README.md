# 배달어때
- 서울시에서 사용자가 위치한 구의 코로나 확진자 데이터와 위험도(자체계산)을 알려주고, 이에따른 음식점을 추천해 주는 서비스 입니다!

## 프로젝트 구성 안내

## 1. 프로젝트 소개

**어떠한 인공지능 모델과 알고리즘을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**

  - 사용하려는 인공지능 모델과 알고리즘을 명시
    - 서울시 자치구별 코로나 위험도 계산 모델
      * 알고리즘

  - 인공지능에 사용하려는 데이터를 명시, 이에 대한 설명
    #### 1. 코로나 위험도 지도

    - 서울시 코로나 데이터 - 매일 업데이트
        
        [](http://data.seoul.go.kr/dataList/OA-20470/S/1/datasetView.do)
        
        - `업데이트` : 매2회
        - `사용 기간` : 30일 전 ~ 현재 (ex. 2021.12.02 ~ 2022.01.01)
    - 서울 생활 인구 데이터
        
        [](https://data.seoul.go.kr/dataList/OA-15379/S/1/datasetView.do)
        
        - `업데이트` : 정기(매일) - 약 일주일 정도 딜레이 존재
        - `사용 기간` : 14일 전 ~ 현재 (ex. 2021.12.18 ~ 2022.01.01)
        - `Open API` : O
    - 구별 다중이용시설 목록
        
        [](https://data.seoul.go.kr/dataList/OA-15380/S/1/datasetView.do)
        
        - `업데이트` : X
        - `사용 기간` : 2021년
        - `Open API` : O
    - 가구주의 연령 및 가구원수별 가구(일반가구) - 시군구
        
        [KOSIS](https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1JC1511&conn_path=I3)
        
        [가구주의_연령_및_가구원수별_가구_일반가구___시군구_20220101200148.csv](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ccfa2c7e-6861-4837-9d45-6b90e7e86532/가구주의_연령_및_가구원수별_가구_일반가구___시군구_20220101200148.csv)
        
        [가구주의_연령_및_가구원수별_가구_일반가구___시군구_합계.csv](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/948df3b1-b0e4-4ada-aaf3-6a465a68a6a1/가구주의_연령_및_가구원수별_가구_일반가구___시군구_합계.csv)
        
        - `업데이트` : X
        - `사용 기간` : 2020년
        - `Open API` : X
    - 공휴일 데이터
        
        [국가공휴일.xlsx](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b41413bd-9c8e-4359-ba58-d6ac26857f80/국가공휴일.xlsx)
    

    #### 2. 코로나 레포트

      - 코로나 확진자 데이터
          - [지도와 동일](https://www.notion.so/DATA-4da2c18df58b42ddbdd311b3d9810771)
      - 백신 데이터
          
          [](https://data.seoul.go.kr/dataList/OA-20914/S/1/datasetView.do)
          
          - `업데이트` : 매2회
          - `사용 기간` : 10일 전 ~ 현재  (ex. 2021.12.22 ~ 2022.01.01)
          - `Open API` : O

    #### 3. 카테고리 추천 (요일, 시간대별)

      - 지역-요일별 **배달 품목정보**
          
          [](https://bdp.kt.co.kr/invoke/SOKBP2603/?goodsCode=KGUAREADOITEM)
          
          - 3개 파일 - merge해서 사용
          - **2019.07.31 ~ 2020.07.31**
          - `업데이트` :  X
          - `사용 기간` : **2019.07.31 ~ 2020.07.31 (all)**
          - `Open API` : X
  - 기술 스택
    - FE
      * React, TypeScript, StyledComponents, ReactRouterDom
    - BE
      * Flask, SQLAlchemy, MariaDB, Sentry
  - 사용된 라이브러리
    - FE
      * axios, lottie-web, plotly.js
    - BE
      * APScheduler, haversine, GoogleMapsAPI, 서울시공공데이터 코로나 자치구별 일일 확진자 API, xmltodict, pandas, csv
  - 웹서비스에 대한 자세한 개요

## 2. 프로젝트 목표

**웹서비스의 해결 과제와 인공지능으로 해결하기 위한 방안 논의 (50자 이상)**
  - 프로젝트 아이디어 동기
  - 문제를 해결하기 위한 특정 질문 명시
  - 인공지능을 통해 해결하려는 문제를 구체적으로 작성

## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
  - 주요 기능 (주된 활용성) 및 서브 기능
  - 프로젝트만의 차별점, 기대 효과

## 4. 프로젝트 구성도
  - 와이어프레임/스토리보드 추가

## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 윤상 | 팀장/백엔드 개발 |
| 최성민 | 팀원/백엔드 개발 |
| 유환익 | 팀원/프론트엔드 개발 |
| 강현희 | 팀원/데이터 분석 |
| 김수현 | 팀원/데이터 분석 |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 or 인공지능 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 인공지능 학습 결과 시각화 담당, UI 디자인 완성
- 수정 단계: 코치님 피드백 반영해서 프론트 디자인 수정

3. 백엔드

- 기획 단계: 데이터셋을 확보하기 위한 데이터베이스 구축, 데이터셋 수집
- 개발 단계: 데이터 베이스 구축 및 API 활용, 웹서비스 사용자의 정보 수집 기능 구현, 인공지능 학습 결과를 활용한 기능 구현
- 수정 단계: 코치님 피드백 반영해서 백엔드 설계/기능 수정

4. 인공지능

- 기획 단계: 웹 서비스 프로젝트 주제에 맞는 모델 및 알고리즘 설정, 모델과 알고리즘에 적합한 데이터셋 수집
- 개발 단계: 데이터 전처리, 학습 모델 구현, 학습 데이터 가공 및 모델 정밀도 향상
- 수정 단계: 코치님 피드백 반영해서 인공지능 학습 방식 수정


## 6. 버전
  - 프로젝트의 버전 기입

## 7. FAQ
  - 자주 받는 질문 정리



