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
<<<<<<< HEAD
      {shopData.filter((info) => info.id === selected)}
=======
      {shopData.map((item) => (
        <li>{item.name}</li>
      ))}
>>>>>>> feature/Frontend#12
      <button onClick={handleCloseModal}>닫기</button>
    </DetailCardContainer>
  );
};

export default RegionalShopDetail;
