import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { formatRating } from '../../../../../../functions/formatter';
import { itemsPerPage } from '../../../../../../store/store';
import {
  Title,
  Comment,
  CommentWrapper,
  Content,
  CommentRating,
  PrevButton,
  NextButton,
  ButtonWrapper,
} from './DeliveryShopDetailReview.styles';

interface Props {
  shopId: string;
}

const DeliveryShopDetailReview = ({ shopId }: Props) => {
  const [review, setReview] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios.get(
        `https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/review/${shopId}`
      );
      const data = await res.data;
      setReview(data);
    };
    fetchReview();
  }, []);

  const lastIdx = curPage * itemsPerPage;
  const firstIdx = lastIdx - itemsPerPage;

  const limitCurItems = (items: any) => {
    let curItems;
    curItems = items.slice(firstIdx, lastIdx);
    return curItems;
  };

  console.log(review);

  return (
    <div>
      <Title>리뷰</Title>
      <CommentWrapper>
        {limitCurItems(review).map((item: any) => (
          <Content>
            <Comment>
              {item.row_num}. {item.comment}
            </Comment>
            <CommentRating>{formatRating(item.rating)}</CommentRating>
          </Content>
        ))}
        <ButtonWrapper>
          <PrevButton
            onClick={() => setCurPage((prev) => prev - 1)}
            disabled={curPage === 1}
          >
            이전
          </PrevButton>
          <span>{curPage}/20</span>
          <NextButton
            onClick={() => setCurPage((prev) => prev + 1)}
            disabled={curPage === 20}
          >
            다음
          </NextButton>
        </ButtonWrapper>
      </CommentWrapper>
    </div>
  );
};

export default DeliveryShopDetailReview;
