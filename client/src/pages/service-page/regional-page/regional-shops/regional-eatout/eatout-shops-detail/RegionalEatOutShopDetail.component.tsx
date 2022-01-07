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
  viewHeight: number;
}

const RegionalEatOutShopDetail: React.FC<Props> = ({
  onCancel,
  shopData,
  selected,
  viewHeight,
}: Props) => {
  const selectedShop = shopData.filter((item) => item.id === Number(selected));

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
    <DetailCardContainer cardHeight={viewHeight}>
      <CloseBtn onClick={handleCloseModal}>x</CloseBtn>
      {selectedShop.map((item) => (
        <DetailDescContainer key={item.id}>
          <DetailShopTitle>{item.name}</DetailShopTitle>
          <DetailItemsWrapper>
            <DetailImage imgUrl={item.img_url_2}></DetailImage>
            <CategoryListWrapper>
              <DetailCategoryList>
                <b>카테고리</b>: {item.category}
              </DetailCategoryList>
              <DetailDescContent>
                <b>평균평점</b>: {item.rating}
              </DetailDescContent>
              <DetailDescContent>
                <b>전화번호</b>: {item.phone}
              </DetailDescContent>
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
              <DetailDescContent>
                <b>평균가격</b>: {item.price}
              </DetailDescContent>
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
