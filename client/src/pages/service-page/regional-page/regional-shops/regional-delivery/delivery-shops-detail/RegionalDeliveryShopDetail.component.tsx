import React, { Suspense } from 'react';
import {
  DetailCardContainer,
  DetailDescContainer,
  DetailImage,
  CategoryListWrapper,
  DetailDescContent,
  DetailCategoryList,
  DetailCategoryItem,
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
import Loading from '../../../../../../components/UI/loading/Loading.component';

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

  const DeliveryShopDetailReview = React.lazy(
    () => import('../delivery-review/DeliveryShopDetailReview.component')
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
            <CategoryListWrapper>
              <DetailCategoryList>
                카테고리:{' '}
                {item.categories.map((cat: any) => (
                  <DetailCategoryItem>{cat}</DetailCategoryItem>
                ))}
              </DetailCategoryList>
              <DetailDescContent>
                평균평점: {formatRating(item.review_avg)}
              </DetailDescContent>
              <DetailDescContent>
                전화번호: {formatPhoneNumber(item.phone)}
              </DetailDescContent>
              <DetailDescContent>
                영업시간: {formatTime(item.begin, item.end)}
              </DetailDescContent>
              <DetailDescContent>
                최소주문금액: {formatPrice(item.min_order_amount)}원
              </DetailDescContent>
            </CategoryListWrapper>
          </DetailItemsWrapper>
        </DetailDescContainer>
      ))}
      <Suspense fallback={<Loading />}>
        <DeliveryShopDetailReview shopId={selected} />
      </Suspense>
    </DetailCardContainer>
  );
};

export default RegionalShopDetail;
