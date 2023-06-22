import { ReviewCardRateItem } from '../review-card-rate-item';

type ReviewCardRateListProps = {
  rate: number;
}

export const ReviewCardRateList = ({rate}: ReviewCardRateListProps) => {
  const rates = [];
  for (let i = 0; i < rate; i++) {
    rates.push(i);
  }
  return(
    <div className="rate review-card__rate">
      {rates.map((item) => <ReviewCardRateItem key={item}/> )}
      <p className="visually-hidden">Оценка: {rate}</p>
    </div>
  );};
