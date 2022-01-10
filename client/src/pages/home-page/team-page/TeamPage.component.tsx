import { useRef, useEffect, useState, Suspense } from 'react';
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

import teamIntro from '../../../assets/data/teamIntro.json';
import TeamHeader from './TeamHeader.component';
import Loading from '../../../components/UI/loading/Loading.component';

const TeamPage = () => {
  const [viewHeight, setViewHeight] = useState(0);

  const sectionRef = useRef<any>(null);

  /* 버튼 스크롤링을 위한 전체 페이지 크기를 저장 */
  useEffect(() => {
    setViewHeight(sectionRef.current.clientHeight);
  }, []);

  return (
    <TeamPageContainer ref={sectionRef}>
      <TeamHeader viewHeight={viewHeight} />
      <MemberContainer>
        <Suspense fallback={<Loading />}>
          {teamIntro.map((data: any) => (
            <>
              <MemberName>{data.memberName}</MemberName>
              <FirstParagraph>
                <ProfileImage
                  src={data.memberImage2.default}
                  alt={data.memberRole}
                />
                <MemberDescription>
                  <Introduction>{data.memberIntro1}</Introduction>
                </MemberDescription>
              </FirstParagraph>
              <SecondParagraph>
                <MemberDescription>
                  <ProfileImage
                    src={data.memberImage2.default}
                    alt={data.memberRole}
                  />
                  <Introduction>{data.memberIntro2}</Introduction>
                  <Introduction>{data.memberIntro3}</Introduction>
                </MemberDescription>
              </SecondParagraph>
            </>
          ))}
        </Suspense>
      </MemberContainer>
    </TeamPageContainer>
  );
};

export default TeamPage;
/*HYENHEE_FACE_IMG*/
/*HYENHEE_FULL_IMG*/
