import axios from 'axios';
import { useEffect, useState } from 'react';
import { EAT_OUT_REVIEW_URL } from '../../../../../../assets/data/requestUrls';
import { formatRating } from '../../../../../../functions/formatter';
import {
  Title,
  Comment,
  CommentWrapper,
  Content,
  CommentRating,
} from './EatOutShopDetailReview.styles';

interface Props {
  shopId: string;
}

const EatOutShopDetailReview = ({ shopId }: Props) => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios.get(`${EAT_OUT_REVIEW_URL}${shopId}`);
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
            <p>-게시일: {item.review_1.slice(-10)} </p>
            <Comment>2. {item.review_2.slice(0, -10)}</Comment>
            <p>-게시일: {item.review_2.slice(-10)} </p>
            <Comment>3. {item.review_3.slice(0, -10)}</Comment>
            <p>-게시일: {item.review_3.slice(-10)} </p>
            <CommentRating>{formatRating(item.rating)}</CommentRating>
          </Content>
        ))}
      </CommentWrapper>
    </div>
  );
};

export default EatOutShopDetailReview;
