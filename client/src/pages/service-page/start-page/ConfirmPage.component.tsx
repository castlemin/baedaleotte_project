import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { USER_LOCATION_URL } from '../../../assets/data/requestUrls';
import { userGu, userLocation } from '../../../store/store';
import {
  ConfirmButton,
  ConfirmCard,
  ConfirmMessage,
  ConfirmPageContainer,
  WarningMessage,
} from './ConfirmPage.styles';

const ConfirmPage = () => {
  const [message, setMessage] = useState('');
  const [buttonOn, setButtonOn] = useState(true);
  const userGPS = useRecoilValue(userLocation);
  const setUserDistrict = useSetRecoilState(userGu);
  const navigate = useNavigate();

  /* 좌표 정보를 가져온다. */

  const cors = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setUserGPS({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       {
  //         enableHighAccuracy: false,
  //         maximumAge: 0,
  //         timeout: Infinity,
  //       }
  //     );
  //   } else {
  //     console.log('GPS 접근이 거부되었습니다.');
  //   }
  // };
  // getLocation();

  useEffect(() => {
    const getDistrict = async () => {
      const res = await cors.post(USER_LOCATION_URL, userGPS);
      const region = await res.data.region;
      setUserDistrict(region);
    };
    getDistrict();
  }, []);

  const handleToReport = () => {
    navigate('/service/regional/report');
  };

  const handleToMain = () => {
    navigate('/');
  };

  const handleSetMessage = () => {
    setMessage(
      `죄송합니다. 현 서비스는 서울시 만을 범위로 사용가능하십니다. 5초 뒤 메인화면으로 이동합니다.`
    );

    setButtonOn(false);
    setTimeout(() => {
      handleToMain();
    }, 5000);
  };

  return (
    <ConfirmPageContainer>
      <ConfirmCard>
        <ConfirmMessage>
          해당 서비스는 서울시를 제공 범위로 제한하고 있습니다.
        </ConfirmMessage>
        <ConfirmMessage>
          서울시 시민 혹은 서울에 현재 재류하고 계십니까?
        </ConfirmMessage>
        {buttonOn ? (
          <>
            <ConfirmButton onClick={handleToReport}>예</ConfirmButton>
            <ConfirmButton onClick={handleSetMessage}>아니오</ConfirmButton>
          </>
        ) : (
          <WarningMessage>{message}</WarningMessage>
        )}
      </ConfirmCard>
    </ConfirmPageContainer>
  );
};

export default ConfirmPage;
