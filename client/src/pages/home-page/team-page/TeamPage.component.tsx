import Header from '../../../components/UI/header/Header.component';
import { TitleContainer } from './TeamPage.styles';
import HWANIK_FACE_IMG from '../../../assets/images/team/hwanIk_face.png';
import HWANIK_FULL_IMG from '../../../assets/images/team/hwanIk_full.png';
import SANG_FACE_IMG from '../../../assets/images/team/Sang_face.png';
import SANG_FULL_IMG from '../../../assets/images/team/Sang_full.png';
import SUNGMIN_FACE_IMG from '../../../assets/images/team/sungMin_face.png';
import SUNGMIN_FULL_IMG from '../../../assets/images/team/sungMin_full.png';
import SUHYEN_FACE_IMG from '../../../assets/images/team/suHyen_face.png';
import SUHYEN_FULL_IMG from '../../../assets/images/team/suHyen_full.png';

const TeamPage = () => {
  return (
    <div>
      <TitleContainer>팀 소개 페이지입니다.</TitleContainer>
      <div>
        <h2>윤상</h2>
        <div style={{ display: 'flex' }}>
          <img
            style={{
              width: '300px',
              border: '1px solid red',
              borderRadius: '50%',
            }}
            src={SANG_FACE_IMG}
            alt='frontend developer'
          />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde dolor
            magni beatae sunt magnam a excepturi aut officia suscipit! Non enim
            hic ab exercitationem voluptas necessitatibus nam molestias sed
            maxime.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <img
            style={{
              width: '300px',
              border: '1px solid red',
              borderRadius: '50%',
            }}
            src={SANG_FULL_IMG}
            alt='frontend developer'
          />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
            asperiores placeat necessitatibus mollitia pariatur ipsa
            praesentium? Dolorum obcaecati, quasi iusto tempora et nulla
            eligendi facilis doloribus molestias cum ducimus culpa.
          </p>
        </div>
      </div>
      <div>
        <h2>유환익</h2>
        <div style={{ display: 'flex' }}>
          <img
            style={{
              width: '300px',
              border: '1px solid red',
              borderRadius: '50%',
            }}
            src={HWANIK_FACE_IMG}
            alt='frontend developer'
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            iste suscipit, perspiciatis minima beatae ipsum sapiente vitae
            reiciendis, hic commodi possimus porro laudantium, id facere
            delectus dolores similique error molestias?
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <img
            style={{
              width: '300px',
              border: '1px solid red',
              borderRadius: '50%',
            }}
            src={HWANIK_FULL_IMG}
            alt='frontend developer'
          />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis,
            praesentium! Blanditiis ipsum consequuntur laborum voluptas aut
            ipsam natus repellendus at, ex ipsa. Libero fuga repellat fugit nisi
            saepe laudantium rerum!
          </p>
        </div>
      </div>
      <div>
        <h2>최성민</h2>
        <img
          style={{
            width: '300px',
            border: '1px solid red',
            borderRadius: '50%',
          }}
          src={SUNGMIN_FACE_IMG}
          alt='frontend developer'
        />
        <img
          style={{
            width: '300px',
            border: '1px solid red',
            borderRadius: '50%',
          }}
          src={SUNGMIN_FULL_IMG}
          alt='frontend developer'
        />
      </div>
      <div>
        <h2>김수현</h2>
        <img
          style={{
            width: '300px',
            border: '1px solid red',
            borderRadius: '50%',
          }}
          src={SUHYEN_FACE_IMG}
          alt='frontend developer'
        />
        <img
          style={{
            width: '300px',
            border: '1px solid red',
            borderRadius: '50%',
          }}
          src={SUHYEN_FULL_IMG}
          alt='frontend developer'
        />
      </div>
    </div>
  );
};

export default TeamPage;
