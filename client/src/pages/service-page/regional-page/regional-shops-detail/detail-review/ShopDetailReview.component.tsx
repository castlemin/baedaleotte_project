import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatRating } from '../../../../../functions/formatRating';
import {
  Title,
  Comment,
  CommentWrapper,
  Content,
  CommentRating,
} from './ShopDetailReview.styles';

interface Props {
  shopId: string;
}

const ShopDetailReview = ({ shopId }: Props) => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios.get(
        `https://a4f6d6aa-7694-4185-b2c9-534ac61ec028.mock.pstmn.io/review/${shopId}`
      );
      const data = await res.data;
      setReview(data.slice(0, 5));
    };
    fetchReview();
  }, []);

  console.log(review);

  return (
    <div>
      <Title>리뷰</Title>
      <CommentWrapper>
        {review.map((item: any) => (
          <Content>
            <Comment>{item.comment}</Comment>
            <CommentRating>{formatRating(item.rating)}</CommentRating>
          </Content>
        ))}
      </CommentWrapper>
    </div>
  );
};

export default ShopDetailReview;
