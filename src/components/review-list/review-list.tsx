import { useEffect, useRef, useState } from 'react';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { Reviews} from '../../store/review-list-api/type';
import { MAX_REVIEW_COUNT } from './constants';
import { ReviewListProps } from './types';
import { getReviewList } from '../../utils/utils';
import { ReviewItem } from '../review-item';

export const ReviewList = ({ cameraId, setRate, setEvaluation }: ReviewListProps) => {
  const endItemRef = useRef<number>(0);
  const { data } = reviewListApi.useGetListQuery(cameraId);

  const [reviews, setReviews] = useState<Reviews>([]);
  const [endReviews, setEndReviews] = useState<number>(MAX_REVIEW_COUNT);

  const goToNextReviews = () => {
    setEndReviews((prev) => {
      const newState = prev + MAX_REVIEW_COUNT;
      if (newState > endItemRef.current) {
        return prev;
      }
      return newState;
    });
  };

  const nextReviewHandler = () => {
    goToNextReviews();
  };

  useEffect(() => {
    const getEndItem = () => Math.ceil((data?.length || 0) / MAX_REVIEW_COUNT) * MAX_REVIEW_COUNT;
    const init = getReviewList(data || []).slice(0, endReviews);
    endItemRef.current = getEndItem();
    setReviews(init);
    if(data){
      setRate(data.length);
      let evaluationNumber = 0;
      let rating = 0;
      rating = data.map((i)=>(evaluationNumber += i.rating)).reverse()[0];

      setEvaluation(Math.ceil(rating / data.length));
    }

  }, [data, endReviews, setEvaluation, setRate]);

  const isHidden = (): boolean => endItemRef.current === endReviews || data?.length === 0;

  return (
    <>
      <ul className="review-block__list">
        {reviews.map((item) => <ReviewItem review={item} key={item.id} />)}
      </ul>
      <div className="review-block__buttons">
        {isHidden() ? '' :
          <button
            className="btn btn--purple"
            type="button"
            onClick={(evt) => {
              evt.preventDefault();
              nextReviewHandler();
            }}
          >
            Показать больше отзывов
          </button>}
      </div>
    </>
  );
};

