import React, { useState } from 'react';
import { DetailCardContainer } from './RegionalShopDetail.styles';

interface Props {
  onCancel: () => void;
  shopData: any[];
  selected: string;
}

const RegionalShopDetail = ({ onCancel, shopData, selected }: Props) => {
  const [detailInfo, setDetailInfo] = useState([]);

  const handleCloseModal = () => {
    onCancel();
  };
  return (
    <DetailCardContainer>
      {shopData.map((item) => (
        <li>{item.name}</li>
      ))}
      <button onClick={handleCloseModal}>닫기</button>
    </DetailCardContainer>
  );
};

export default RegionalShopDetail;
