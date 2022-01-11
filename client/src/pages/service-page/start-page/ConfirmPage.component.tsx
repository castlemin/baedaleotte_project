import axios from 'axios';
import { useEffect, useState } from 'react';
import { USER_LOCATION_URL } from '../../../assets/data/requestUrls';
import { useRecoilState } from 'recoil';
import { userGu } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import {
  ConfirmButton,
  ConfirmCard,
  ConfirmMessage,
  ConfirmPageContainer,
} from './ConfirmPage.styles';

const ConfirmPage = () => {
  const [userDistrict, setUserDistrict] = useRecoilState(userGu);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const cors = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  const params = userDistrict;

  useEffect(() => {
    const sendUserLocation = async () => {
      const sendCoords = await cors.post(USER_LOCATION_URL, params);
      const targetDistrict = sendCoords.data.region;
      setUserDistrict(targetDistrict);
    };
    /* 함수 실행단 */
    sendUserLocation();
  }, []);

  const handleToReport = () => {
    navigate('/service/regional/report');
  };
  const handleToMain = () => {
    navigate('/');
  };
  const handleSetMessage = () => {
    setMessage(
      '죄송합니다. 현 서비스는 서울시 만을 범위로 사용가능하십니다. 5초 뒤 메인화면으로 이동합니다.'
    );
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
        <p>{message}</p>
        <ConfirmButton onClick={handleToReport}>예</ConfirmButton>
        <ConfirmButton onClick={handleSetMessage}>아니오</ConfirmButton>
      </ConfirmCard>
    </ConfirmPageContainer>
  );
};

export default ConfirmPage;
