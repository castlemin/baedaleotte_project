import React, { Suspense } from 'react';
import Loading from '../../../../../../components/UI/loading/Loading.component';
import {
  formatEatOutWeekdayHour,
  formatEatOutWeekendHour,
} from '../../../../../../functions/formatter';
import {
  DetailCardContainer,
  DetailDescContainer,
  DetailImage,
  CategoryListWrapper,
  DetailDescContent,
  DetailCategoryList,
  CloseBtn,
  DetailShopTitle,
  DetailItemsWrapper,
} from './RegionalEatOutShopDetail.styles';

interface Props {
  onCancel: () => void;
  shopData: any[];
  selected: string;
}

const RegionalEatOutShopDetail: React.FC<Props> = ({
  onCancel,
  shopData,
  selected,
}: Props) => {
  const selectedShop = shopData.filter((item) => item.id === Number(selected));

  console.log(selectedShop);

  const handleCloseModal = () => {
    onCancel();
  };

  const EatOutShopDetailReview = React.lazy(
    () =>
      import(
        '../../regional-eatout/eatout-review/EatOutShopDetailReview.component'
      )
  );

  return (
    <DetailCardContainer>
      <CloseBtn onClick={handleCloseModal}>x</CloseBtn>
      {selectedShop.map((item) => (
        <DetailDescContainer key={item.id}>
          <DetailShopTitle>{item.name}</DetailShopTitle>
          <DetailItemsWrapper>
            <DetailImage imgUrl={item.img_url_1}></DetailImage>
            <CategoryListWrapper>
              <DetailCategoryList>카테고리: {item.category}</DetailCategoryList>
              <DetailDescContent>평균평점: {item.rating}</DetailDescContent>
              <DetailDescContent>전화번호: {item.phone}</DetailDescContent>
              <DetailDescContent>
                <b>영업시간(주중)</b>: {formatEatOutWeekdayHour(item.hour)}
              </DetailDescContent>
              <DetailDescContent>
                {formatEatOutWeekendHour(item.hour) === '' ? (
                  ''
                ) : (
                  <DetailDescContent>
                    <b>영업시간(주말)</b>: {formatEatOutWeekendHour(item.hour)}
                  </DetailDescContent>
                )}
              </DetailDescContent>
              <DetailDescContent>평균가격: {item.price}</DetailDescContent>
            </CategoryListWrapper>
          </DetailItemsWrapper>
        </DetailDescContainer>
      ))}
      <Suspense fallback={<Loading />}>
        <EatOutShopDetailReview shopId={selected} />
      </Suspense>
    </DetailCardContainer>
  );
};

export default RegionalEatOutShopDetail;
