import { useEffect, useState } from "react";
import { userGu, userLocation } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import seoul_gu_data from "../../../assets/data/seoul_regions.json";
import { seoulGuData } from "../../../assets/data/seoulGuData";
import {
  ConfirmButton,
  ConfirmCard,
  ConfirmMessage,
  ConfirmPageContainer,
  GuLabel,
  GuSelectionForm,
  WarningMessage,
} from "./ConfirmPage.styles";
import { useRecoilState } from "recoil";
import Button from "../../../components/UI/button/Button.component";

const ConfirmPage = () => {
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState([]);
  const [guList, setGuList] = useState<any>([]);
  const [buttonOn, setButtonOn] = useState(true);
  const [formOn, setFormOn] = useState(false);
  const navigate = useNavigate();

  /* 좌표 정보를 가져온다. */

  useEffect(() => {
    setGuList(seoulGuData);
  }, []);

  const handleToReport = async () => {
    if (!check.length) {
      alert("지역을 선택해주세요!");
      return;
    }
    navigate("/service/regional/report");
  };

  const handleOpenForm = () => {
    setButtonOn(false);
    setFormOn(true);
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
        {buttonOn ? (
          <>
            <ConfirmButton onClick={handleOpenForm}>예</ConfirmButton>
            <ConfirmButton onClick={handleSetMessage}>아니오</ConfirmButton>
          </>
        ) : !buttonOn && formOn ? (
          <>
            <GuLabel>선택 지역: {check}</GuLabel>
            <GuSelectionForm>
              {guList.map((gu: string, idx: string) => (
                <Button
                  key={idx}
                  gu={gu}
                  number={idx}
                  onSetCheck={setCheck}
                  checkedVal={check}
                />
              ))}
            </GuSelectionForm>
            <ConfirmButton onClick={handleToReport}>확인</ConfirmButton>
          </>
        ) : (
          <WarningMessage>{message}</WarningMessage>
        )}
      </ConfirmCard>
    </ConfirmPageContainer>
  );
};

export default ConfirmPage;
