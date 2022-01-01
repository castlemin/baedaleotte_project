import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card/Card.styles';
import { SubmitBtn } from './ServiceStartPage.styles';

const ServiceStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [GPS, setGPS] = useState({});

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGPS({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
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
        <p>해당 서비스는 사용자님의 위치정보를 필요로 해요.</p>
        <p>
          사용자님의 위치 정보를 통해, 위치하신 지역의 코로나 위험도와 근방
          배달음식점을 파악해야 하기 때문이죠.
        </p>
        <SubmitBtn onClick={handleClick}>위치 정보 제공을 동의합니다</SubmitBtn>
      </Card>
    </>
  );
};

export default ServiceStartPage;
