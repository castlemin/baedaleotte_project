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
  viewHeight: number;
}

const RegionalShopDetail: React.FC<Props> = ({
  onCancel,
  shopData,
  selected,
  viewHeight,
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
    <DetailCardContainer height={viewHeight}>
      <CloseBtn onClick={handleCloseModal}>x</CloseBtn>
      {selectedShop.map((item) => (
        <DetailDescContainer key={item.restaurant_id}>
          <DetailShopTitle>{item.name}</DetailShopTitle>
          <DetailItemsWrapper>
            <DetailImage imgUrl={item.logo_url}></DetailImage>
            <CategoryListWrapper>
              <DetailCategoryList>
                <b>카테고리</b>:{' '}
                {item.categories.map((cat: any) => (
                  <DetailCategoryItem>{cat}</DetailCategoryItem>
                ))}
              </DetailCategoryList>
              <DetailDescContent>
                <b>평균평점</b>: {formatRating(item.review_avg)}
              </DetailDescContent>
              <DetailDescContent>
                <b>전화번호</b>: {formatPhoneNumber(item.phone)}
              </DetailDescContent>
              <DetailDescContent>
                <b>영업시간</b>: {formatTime(item.begin, item.end)}
              </DetailDescContent>
              <DetailDescContent>
                <b>최소주문금액</b>: {formatPrice(item.min_order_amount)}원
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
