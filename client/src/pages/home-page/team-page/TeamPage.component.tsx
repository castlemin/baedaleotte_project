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
  Wrapper,
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
  const [height, setHeight] = useState(0);
  const memberSectionRef = useRef<any>(null);

  useEffect(() => {
    setHeight(memberSectionRef.current.scrollHeight);
  }, []);

  return (
    <>
      <TeamHeader viewHeight={height} />
      <MemberContainer ref={memberSectionRef}>
        <Wrapper>
          <MemberName>윤상</MemberName>
          <FirstParagraph>
            <ProfileImage
              src={SANG_FACE_IMG}
              alt='Team Leader, backend developer'
            />
            <MemberDescription>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
              dolor magni beatae sunt magnam a excepturi aut officia suscipit!
              Non enim hic ab exercitationem voluptas necessitatibus nam
              molestias sed maxime.
            </MemberDescription>
          </FirstParagraph>
          <SecondParagraph>
            <ProfileImage
              src={SANG_FULL_IMG}
              alt='Team Leader, backend developer'
            />
            <MemberDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
              asperiores placeat necessitatibus mollitia pariatur ipsa
              praesentium? Dolorum obcaecati, quasi iusto tempora et nulla
              eligendi facilis doloribus molestias cum ducimus culpa.
            </MemberDescription>
          </SecondParagraph>
        </Wrapper>
      </MemberContainer>
      <MemberContainer>
        <Wrapper>
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Officiis, praesentium! Blanditiis ipsum consequuntur laborum
              voluptas aut ipsam natus repellendus at, ex ipsa. Libero fuga
              repellat fugit nisi saepe laudantium rerum!
            </MemberDescription>
          </SecondParagraph>
        </Wrapper>
      </MemberContainer>
      <MemberContainer>
        <Wrapper>
          <MemberName>최성민</MemberName>
          <FirstParagraph>
            <ProfileImage src={SUNGMIN_FACE_IMG} alt='backend developer' />
            <MemberDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              beatae unde neque omnis incidunt nobis laudantium similique
              placeat rerum reprehenderit aliquid fugiat dolorem odio, dolorum
              accusamus nesciunt dignissimos ex necessitatibus.
            </MemberDescription>
          </FirstParagraph>
          <SecondParagraph>
            <ProfileImage src={SUNGMIN_FULL_IMG} alt='backend developer' />
            <MemberDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
              accusantium sint distinctio maxime fuga quod ut inventore,
              possimus corrupti ex, omnis voluptatem optio beatae exercitationem
              nobis natus nemo impedit dolores.
            </MemberDescription>
          </SecondParagraph>
        </Wrapper>
      </MemberContainer>
      <MemberContainer>
        <Wrapper>
          <MemberName>김수현</MemberName>
          <FirstParagraph>
            <ProfileImage src={SUHYEN_FACE_IMG} alt='data analylist' />
            <MemberDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              minima saepe eveniet maxime odit doloribus expedita natus
              quibusdam, a quidem tenetur nesciunt repudiandae eligendi officiis
              sit iure praesentium similique facere.
            </MemberDescription>
          </FirstParagraph>
          <SecondParagraph>
            <ProfileImage src={SUHYEN_FULL_IMG} alt='data analylist' />
            <MemberDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem a deleniti qui sed quaerat in perspiciatis asperiores
              illo temporibus atque, iure quod, iste hic similique nulla beatae.
              Qui, culpa soluta.
            </MemberDescription>
          </SecondParagraph>
        </Wrapper>
      </MemberContainer>
      <MemberContainer>
        <Wrapper>
          <MemberName>강현희</MemberName>
          <FirstParagraph>
            <ProfileImage src={HYEONHEE_FACE_IMG} alt='data analylist' />
            <MemberDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              minima saepe eveniet maxime odit doloribus expedita natus
              quibusdam, a quidem tenetur nesciunt repudiandae eligendi officiis
              sit iure praesentium similique facere.
            </MemberDescription>
          </FirstParagraph>
          <SecondParagraph>
            <ProfileImage src={HYEONHEE_FULL_IMG} alt='data analylist' />
            <MemberDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem a deleniti qui sed quaerat in perspiciatis asperiores
              illo temporibus atque, iure quod, iste hic similique nulla beatae.
              Qui, culpa soluta.
            </MemberDescription>
          </SecondParagraph>
        </Wrapper>
      </MemberContainer>
    </>
  );
};

export default TeamPage;
/*HYENHEE_FACE_IMG*/
/*HYENHEE_FULL_IMG*/
