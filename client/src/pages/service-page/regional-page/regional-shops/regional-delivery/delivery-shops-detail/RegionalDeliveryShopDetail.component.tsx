import React from 'react';
import DeliveryShopDetailReview from '../delivery-review/DeliveryShopDetailReview.component';
import {
  DetailCardContainer,
  DetailDescContainer,
  DetailImage,
  DetailCategoryList,
  DetailDescListItem,
  CloseBtn,
  DetailShopTitle,
  DetailItemsWrapper,
} from './RegionalDeliveryShopDetail.styles';
import {
  formatPhoneNumber,
  formatPrice,
  formatRating,
  formatTime,
} from '../../../../../../functions/formatter';

interface Props {
  onCancel: () => void;
  shopData: any[];
  selected: string;
}

const RegionalShopDetail: React.FC<Props> = ({
  onCancel,
  shopData,
  selected,
}: Props) => {
  const selectedShop = shopData.filter(
    (item) => item.restaurant_id === Number(selected)
  );

  const handleCloseModal = () => {
    onCancel();
  };

  return (
    <DetailCardContainer>
      <CloseBtn onClick={handleCloseModal}>x</CloseBtn>
      {selectedShop.map((item) => (
        <DetailDescContainer key={item.restaurant_id}>
          <DetailShopTitle>{item.name}</DetailShopTitle>
          <DetailItemsWrapper>
            <DetailImage imgUrl={item.logo_url}></DetailImage>
            <div>
              <DetailCategoryList>
                카테고리:{' '}
                {item.categories.map((cat: any) => (
                  <DetailDescListItem>{cat}</DetailDescListItem>
                ))}
              </DetailCategoryList>
              <p>평균평점: {formatRating(item.review_avg)}</p>
              <p>전화번호: {formatPhoneNumber(item.phone)}</p>
              <p>영업시간: {formatTime(item.begin, item.end)}</p>
              <p>최소주문금액: {formatPrice(item.min_order_amount)}원</p>
            </div>
          </DetailItemsWrapper>
        </DetailDescContainer>
      ))}
      <DeliveryShopDetailReview shopId={selected} />
    </DetailCardContainer>
  );
};

export default RegionalShopDetail;
