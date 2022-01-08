import Header from '../../../components/UI/header/Header.component';
import { useRef, useEffect, useState } from 'react';
import {
  TeamPageContainer,
  MemberName,
  MemberContainer,
  FirstParagraph,
  SecondParagraph,
  ProfileImage,
  MemberDescription,
  Introduction,
} from './TeamPage.styles';
import HWANIK_FACE_IMG from '../../../assets/images/team/hwanIk_face.png';
import HWANIK_FULL_IMG from '../../../assets/images/team/hwanIk_full.png';
import SANG_FACE_IMG from '../../../assets/images/team/Sang_face.png';
import SANG_FULL_IMG from '../../../assets/images/team/Sang_full.png';
import SUNGMIN_FACE_IMG from '../../../assets/images/team/sungMin_face.png';
import SUNGMIN_FULL_IMG from '../../../assets/images/team/sungMin_full.png';
import SUHYEN_FACE_IMG from '../../../assets/images/team/suHyen_face.png';
import SUHYEN_FULL_IMG from '../../../assets/images/team/suHyen_full.png';
import HYEONHEE_FACE_IMG from '../../../assets/images/team/hyeonHee_face.png';
import HYEONHEE_FULL_IMG from '../../../assets/images/team/hyeonHee_full.png';

import TeamHeader from './TeamHeader.component';

const TeamPage = () => {
  const [viewHeight, setViewHeight] = useState(0);

  const sectionRef = useRef<any>(null);

  useEffect(() => {
    setViewHeight(sectionRef.current.scrollHeight);
  }, []);

  return (
    <div>
      <TeamHeader viewHeight={viewHeight} />
      <MemberContainer ref={sectionRef}>
        <MemberName>윤상</MemberName>
        <FirstParagraph>
          <ProfileImage
            src={SANG_FACE_IMG}
            alt='Team Leader, backend developer'
          />
          <MemberDescription>
            <Introduction>
              안녕하세요! 백엔드, 서버 개발자로서 성장중인 윤상 입니다. 배달어때
              프로젝트에선 플라스크를 이용한 백엔드 코딩과 데이터 크롤링(공공API
              및 구글MAPS API 활용), 서버 DB세팅 및 배포를 담당 하였습니다!
            </Introduction>
            <Introduction>
              평소 코딩하는것을 즐겁게 생각하였고, 학부생 시절에도 알고리즘
              강의를 가장 재밋게 들었던 기억이 있어 지속적으로 개발자로서
              성장하고 싶어 엘리스에 지원하였고 열심히 성장 중입니다!
            </Introduction>
          </MemberDescription>
        </FirstParagraph>
        <SecondParagraph>
          <ProfileImage
            src={SANG_FULL_IMG}
            alt='Team Leader, backend developer'
          />
          <MemberDescription>
            <Introduction>
              취미는 온라인 게임, 영화보기, 달리기 및 운동하기 입니다 (가끔
              알고리즘 문제를 풀기도 합니다..)!
            </Introduction>
          </MemberDescription>
        </SecondParagraph>
      </MemberContainer>
      <MemberContainer>
        <MemberName>유환익</MemberName>
        <FirstParagraph>
          <ProfileImage src={HWANIK_FACE_IMG} alt='frontend developer' />
          <MemberDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            iste suscipit, perspiciatis minima beatae ipsum sapiente vitae
            reiciendis, hic commodi possimus porro laudantium, id facere
            delectus dolores similique error molestias?
          </MemberDescription>
        </FirstParagraph>
        <SecondParagraph>
          <ProfileImage src={HWANIK_FULL_IMG} alt='frontend developer' />
          <MemberDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis,
            praesentium! Blanditiis ipsum consequuntur laborum voluptas aut
            ipsam natus repellendus at, ex ipsa. Libero fuga repellat fugit nisi
            saepe laudantium rerum!
          </MemberDescription>
        </SecondParagraph>
      </MemberContainer>
      <MemberContainer>
        <MemberName>최성민</MemberName>
        <FirstParagraph>
          <ProfileImage src={SUNGMIN_FACE_IMG} alt='backend developer' />
          <MemberDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas beatae
            unde neque omnis incidunt nobis laudantium similique placeat rerum
            reprehenderit aliquid fugiat dolorem odio, dolorum accusamus
            nesciunt dignissimos ex necessitatibus.
          </MemberDescription>
        </FirstParagraph>
        <SecondParagraph>
          <ProfileImage src={SUNGMIN_FULL_IMG} alt='backend developer' />
          <MemberDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            accusantium sint distinctio maxime fuga quod ut inventore, possimus
            corrupti ex, omnis voluptatem optio beatae exercitationem nobis
            natus nemo impedit dolores.
          </MemberDescription>
        </SecondParagraph>
      </MemberContainer>
      <MemberContainer>
        <MemberName>김수현</MemberName>
        <FirstParagraph>
          <ProfileImage src={SUHYEN_FACE_IMG} alt='data analylist' />
          <MemberDescription>
            <Introduction>
              안녕하세요 배달어때 프로젝트에서 데이터 분석을 맡은 김수현입니다.
            </Introduction>
            <Introduction>
              데이터 분석 및 모델링을 통해 미래를 예측하여 세상에 도움이 되고
              싶어서 데이터 분석/사이언티스트를 목표로 하게 되었습니다.
            </Introduction>
          </MemberDescription>
        </FirstParagraph>
        <SecondParagraph>
          <ProfileImage src={SUHYEN_FULL_IMG} alt='data analylist' />
          <MemberDescription>
            <Introduction>
              좋아하는 것은 아바라 마시며 코딩하기, 간맥하기, 여행다니기 입니다.
            </Introduction>
          </MemberDescription>
        </SecondParagraph>
      </MemberContainer>
      <MemberContainer>
        <MemberName>강현희</MemberName>
        <FirstParagraph>
          <ProfileImage src={HYEONHEE_FACE_IMG} alt='data analylist' />
          <MemberDescription>
            <Introduction>
              컴퓨터가 좋아 IT직무를 떠돌던 풀스택 개발자 지망생.
            </Introduction>
            <Introduction>
              원하는 기능 및 프로그램을 직접 만들어 낼 수 있는 개발자들 부러워
              개발자를 목표로 하게 되었음
            </Introduction>
          </MemberDescription>
        </FirstParagraph>
        <SecondParagraph>
          <ProfileImage src={HYEONHEE_FULL_IMG} alt='data analylist' />
          <MemberDescription>
            <Introduction>
              좋아하는 건 책 읽기,맥주 마시기 그리고 식물 키우기
            </Introduction>
          </MemberDescription>
        </SecondParagraph>
      </MemberContainer>
    </div>
  );
};

export default TeamPage;
/*HYENHEE_FACE_IMG*/
/*HYENHEE_FULL_IMG*/
