import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useFetchGraph } from '../../../hooks/useFetchJson';
import {
  ToServiceBtn,
  ToServiceBtnContainer,
  BackgroundContainer,
  ApprovalContainer,
  ApproveLabel,
  ApprovalCheck,
  GPSRequestContainer,
  RequestTitleContainer,
  RequestDescContainer,
  ExampleTitle,
} from './ServiceStartPage.styles';
import { userLocation } from '../../../store/store';
import Loading from '../../../components/UI/loading/Loading.component';

const SeoulMap = React.lazy(() =>
  import('../../../assets/data/Graphs/SeoulMap').then(({ SeoulMap }) => ({
    default: SeoulMap,
  }))
);

const ServiceStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [userCoords, setUserCoords] = useRecoilState(userLocation);
  const [checked, setChecked] = useState(false);

  const seoulMapJson = useFetchGraph('seoul_risk_map_all');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
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

  return (
    <BackgroundContainer>
      <GPSRequestContainer>
        <RequestTitleContainer>
          해당 서비스는 사용자님의 위치정보를 필요로 해요.
        </RequestTitleContainer>
        <ExampleTitle>서울시 전체 코로나 위험도</ExampleTitle>
        <Suspense fallback={<Loading />}>
          <SeoulMap data={seoulMapJson.data} layout={seoulMapJson.layout} />
        </Suspense>
        <RequestDescContainer>
          보시는 것 처럼 사용자님의 현재 위치 정보를 통해, 위치하신 지역의
          코로나 위험도를 분석하고 근방 배달음식점을 파악해야 하기 때문이죠.
        </RequestDescContainer>
        <br />
        <RequestDescContainer>
          회원님의 GPS 정보 사용에 동의하시겠습니까?
        </RequestDescContainer>
        <ApprovalContainer onChange={handleCheck}>
          <ApproveLabel htmlFor='approval'>
            <ApprovalCheck
              type='checkbox'
              name='approval'
              defaultChecked={checked}
            />
            위치 정보 제공을 동의합니다.
          </ApproveLabel>
        </ApprovalContainer>
        <ToServiceBtnContainer>
          <ToServiceBtn
            name='toRegional'
            onClick={handleClick}
            disabled={checked === false}
          >
            나의 지역 안전확인
          </ToServiceBtn>
        </ToServiceBtnContainer>
      </GPSRequestContainer>
    </BackgroundContainer>
  );
};

export default ServiceStartPage;
