import { useEffect, useRef, useState } from 'react';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import ReviewItem from '../review-item';
import { Reviews } from '../../store/review-list-api/type';

type ReviewListProps = {
  cameraId: number;
}

const getReviewList = (review: Reviews) => {
  const items = [...review];

  items.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  return items;
};

const MAX_REVIEW_COUNT = 3;

const ReviewList = ({ cameraId }: ReviewListProps) => {
  const endItemRef = useRef<number>(0);
  const { data } = reviewListApi.useGetListQuery(cameraId);

  const [reviews, setReviews] = useState<Reviews | undefined>([]);
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

  const scrollHandler = () => {
    goToNextReviews();
  };

  const nextReviewHandler = () => {
    goToNextReviews();
  };
  //TODO разобраться со скроллом. При переключении товара скролл не обнуляется.
  useEffect(() => {
    const getEndItem = () => Math.ceil((data?.length || 0) / MAX_REVIEW_COUNT) * MAX_REVIEW_COUNT;
    const init = getReviewList(data || []).slice(0, endReviews);
    endItemRef.current = getEndItem();
    setReviews(init);
  }, [data, endReviews]);

  useEffect(() => {
    document.addEventListener('scrollend', scrollHandler);
    return () => {
      document.removeEventListener('scrollend', scrollHandler);
    };
  }, []);

  const isHidden = (): boolean => endItemRef.current === endReviews || data?.length === 0;

  return (
    <>
      <ul className="review-block__list">
        {reviews?.map((item) => <ReviewItem review={item} key={item.id} />)}
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
export default ReviewList;

