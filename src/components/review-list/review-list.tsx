import { useEffect, useState } from 'react';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import ReviewItem from '../review-item';
import { Reviews } from '../../store/review-list-api/type';

type ReviewListProps = {
  cameraId: number;
}

const MAX_REVIEW_COUNT = 3;

const ReviewList = ({cameraId}:ReviewListProps) => {
  const {data} = reviewListApi.useGetListQuery(cameraId);

  const [reviews, setReviews] = useState<Reviews | undefined>([]);
  const [startEndReviews, setStartEndReviews] = useState<[number,number]>([0, MAX_REVIEW_COUNT]);

  const goToNextReviews = () => {
    setStartEndReviews((prev) => [prev[0], prev[1] + MAX_REVIEW_COUNT ] as [number, number]);
  };

  const nextReviewHandler = () => {
    goToNextReviews();
  };

  useEffect(()=>{
    setReviews(data);
  },[data]);

  useEffect(()=>{
    const init = reviews?.slice(startEndReviews[0], startEndReviews[1]);
    setReviews(init);
  },[startEndReviews]);


  //TODO реализовать подгрузку комментариев
  return(
    <>
      <ul className="review-block__list">
        {data?.map((item) => <ReviewItem review={item} key={item.id} />).slice(0,MAX_REVIEW_COUNT) }
      </ul>
      <div className="review-block__buttons">
        <button
          className="btn btn--purple"
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            nextReviewHandler();
          }}
          onScroll={ () =>{
            nextReviewHandler();
          }}
        >
          Показать больше отзывов
        </button>
      </div>
    </>
  );
};
export default ReviewList;
//нужно количество комментариев поделить на число 3. Далее подгружать комменты порциями

