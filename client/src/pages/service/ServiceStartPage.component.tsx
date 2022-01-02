import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card/Card.styles';
import Header from '../../components/UI/header/Header.component';
import {
  DescContainer,
  SubtitleContainer,
} from '../../components/UI/Text/Text.styles';
import {
  SubmitBtn,
  BackgroundContainer,
  ApprovalContainer,
} from './ServiceStartPage.styles';

const ServiceStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [GPS, setGPS] = useState({});
  const [checked, setChecked] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGPS({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === 1) {
            navigate('/');
          }
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      console.log('GPS 접근이 거부되었습니다.');
    }
  };

  const handleCheck = () => {
    setChecked((checked) => !checked);
  };

  /* memory leak 방지 코드입니다. */
  useEffect(() => {
    return () => setChecked(false);
  }, []);

  const handleClick = (e: any) => {
    getLocation();
    e.target.name === 'toRegional'
      ? navigate('regional/report')
      : navigate('preference');
  };

  console.log(GPS);

  return (
    <BackgroundContainer>
      <Header serviceStatic />
      <Card serviceStart>
        <SubtitleContainer serviceStart>
          해당 서비스는 사용자님의 위치정보를 필요로 해요.
        </SubtitleContainer>
        <DescContainer serviceStart>
          사용자님의 위치 정보를 통해, 위치하신 지역의 코로나 위험도와 근방
          배달음식점을 파악해야 하기 때문이죠.
        </DescContainer>
        <br></br>
        <DescContainer serviceStart>
          회원님의 GPS 정보 사용에 동의하시겠습니까?
        </DescContainer>
        <ApprovalContainer onChange={handleCheck}>
          <label htmlFor='approve'>
            <input type='checkbox' name='approve' defaultChecked={checked} />
            위치 정보 제공을 동의합니다.
          </label>
        </ApprovalContainer>
        <div>
          <SubmitBtn
            name='toRegional'
            onClick={handleClick}
            disabled={checked === false}
          >
            나의 지역 안전확인
          </SubmitBtn>
          <SubmitBtn
            name='toPreference'
            onClick={handleClick}
            disabled={checked === false}
          >
            배달음식 성향확인
          </SubmitBtn>
        </div>
      </Card>
    </BackgroundContainer>
  );
};

export default ServiceStartPage;
