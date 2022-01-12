import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userLocation } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import {
  ConfirmButton,
  ConfirmCard,
  ConfirmMessage,
  ConfirmPageContainer,
  WarningMessage,
} from "./ConfirmPage.styles";

const ConfirmPage = () => {
  const setUserGPS = useSetRecoilState(userLocation);
  const [message, setMessage] = useState("");
  const [buttonOn, setButtonOn] = useState(true);
  const navigate = useNavigate();

  /* 좌표 정보를 가져온다. */

  useEffect(() => {
    console.log("불러오기 완료");
  }, []);

  const handleToReport = async () => {
    navigate("/service/regional/report");
  };

  const handleToMain = () => {
    navigate("/");
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
        <WarningMessage>{message}</WarningMessage>
        {buttonOn && (
          <>
            <ConfirmButton onClick={handleToReport}>예</ConfirmButton>
            <ConfirmButton onClick={handleSetMessage}>아니오</ConfirmButton>
          </>
        )}
      </ConfirmCard>
    </ConfirmPageContainer>
  );
};

export default ConfirmPage;
