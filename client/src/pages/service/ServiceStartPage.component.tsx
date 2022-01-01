import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card/Card.styles';
import {
  DescContainer,
  SubtitleContainer,
  TitleContainer,
} from '../../components/UI/Text/Text.styles';
import { SubmitBtn } from './ServiceStartPage.styles';

const ServiceStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [GPS, setGPS] = useState({});

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
  const handleClick = () => {
    getLocation();
  };

  console.log(GPS);

  return (
    <>
      <Card>
        <SubtitleContainer style={{ margin: '60px 20px' }}>
          해당 서비스는 사용자님의 위치정보를 필요로 해요.
        </SubtitleContainer>
        <DescContainer style={{ margin: '0 46px' }}>
          사용자님의 위치 정보를 통해, 위치하신 지역의 코로나 위험도와 근방
          배달음식점을 파악해야 하기 때문이죠.
        </DescContainer>
        <br></br>
        <DescContainer style={{ margin: '0 60px' }}>
          회원님의 GPS 정보 사용에 동의하시겠습니까?
        </DescContainer>
        <label htmlFor='approve' style={{ margin: '60px' }}>
          <input type='checkbox' name='approve' />
          위치 정보 제공을 동의합니다.
        </label>
        <SubmitBtn onClick={handleClick} style={{ marginBottom: '50px' }}>
          시작
        </SubmitBtn>
      </Card>
    </>
  );
};

export default ServiceStartPage;
