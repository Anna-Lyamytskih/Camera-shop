import { LoadingScreen } from '../loading-screen';

type ReviewCardRateListProps = {
  rate: number;
}

export const ReviewCardRateList = ({rate}: ReviewCardRateListProps) => (
  <div className="rate review-card__rate">
    {rate ?
      Array(5).fill('').map((_, index) => (
        <svg key={`${index.toString()}`} width="17" height="16" aria-hidden="true">
          <use data-testid={'star'} xlinkHref={`${index + 1 <= rate ? '#icon-full-star' : '#icon-star'}`}></use>
        </svg>))
      :
      <LoadingScreen/>}
    <p className="visually-hidden">Оценка: {rate}</p>
  </div>
);
