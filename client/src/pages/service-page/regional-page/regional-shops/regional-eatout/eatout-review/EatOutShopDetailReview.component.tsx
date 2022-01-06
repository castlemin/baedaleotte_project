import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatRating } from '../../../../../../functions/formatter';
import {
  Title,
  Comment,
  CommentWrapper,
  Content,
  CommentRating,
  PrevButton,
  NextButton,
  ButtonWrapper,
} from './EatOutShopDetailReview.styles';

interface Props {
  shopId: string;
}

const EatOutShopDetailReview = ({ shopId }: Props) => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios.get(
        `https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/goout/reviews/${shopId}`
      );
      const data = await res.data;
      setReview(data);
    };
    fetchReview();
  }, []);

  return (
    <div>
      <Title>리뷰</Title>
      <CommentWrapper>
        {review.map((item: any) => (
          <Content>
            <Comment>1. {item.review_1.slice(0, -10)}</Comment>
            <p>- {item.review_1.slice(-10)} -</p>
            <Comment>2. {item.review_2.slice(0, -10)}</Comment>
            <p>- {item.review_2.slice(-10)} -</p>
            <Comment>3. {item.review_3.slice(0, -10)}</Comment>
            <p>- {item.review_3.slice(-10)} -</p>
            <CommentRating>{formatRating(item.rating)}</CommentRating>
          </Content>
        ))}
      </CommentWrapper>
    </div>
  );
};

export default EatOutShopDetailReview;
