import { ReviewCardRateList } from '../review-card-rate-list';
import { ReviewItemProps } from './types';

export const ReviewItem = ({review}:ReviewItemProps) => {
  const date = String(new Date(review.createAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  }));

  return(
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={date}>{date}</time>
      </div>
      <ReviewCardRateList rate={review.rating}/>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
};
