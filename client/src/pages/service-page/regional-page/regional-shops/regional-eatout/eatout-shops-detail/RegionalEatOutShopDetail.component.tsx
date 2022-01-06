import React from 'react';
import {
  formatEatOutWeekdayHour,
  formatEatOutWeekendHour,
} from '../../../../../../functions/formatter';
import EatOutShopDetailReview from '../../regional-eatout/eatout-review/EatOutShopDetailReview.component';
import {
  DetailCardContainer,
  DetailDescContainer,
  DetailImage,
  DetailCategoryList,
  DetailDescListItem,
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

  return (
    <DetailCardContainer>
      <CloseBtn onClick={handleCloseModal}>x</CloseBtn>
      {selectedShop.map((item) => (
        <DetailDescContainer key={item.id}>
          <DetailShopTitle>{item.name}</DetailShopTitle>
          <DetailItemsWrapper>
            <DetailImage imgUrl={item.img_url_1}></DetailImage>
            <div>
              <DetailCategoryList>카테고리: {item.category}</DetailCategoryList>
              <p>평균평점: {item.rating}</p>
              <p>전화번호: {item.phone}</p>
              <p>
                <b>영업시간(주중)</b>: {formatEatOutWeekdayHour(item.hour)}
              </p>
              <p>
                {formatEatOutWeekendHour(item.hour) === '' ? (
                  ''
                ) : (
                  <p>
                    <b>영업시간(주말)</b>: {formatEatOutWeekendHour(item.hour)}
                  </p>
                )}
              </p>
              <p>평균가격: {item.price}</p>
            </div>
          </DetailItemsWrapper>
        </DetailDescContainer>
      ))}
      <EatOutShopDetailReview shopId={selected} />
    </DetailCardContainer>
  );
};

export default RegionalEatOutShopDetail;
