import { LoadingScreen } from '../loading-screen';

type ProductRateProps = {
  rate: number | undefined;
  evaluation: number | undefined;
}

export const ProductRate = ({rate, evaluation}:ProductRateProps) => (
  <div className="rate product__rate">
    { evaluation ?
      Array(5).fill('').map((_, index) => (
        <svg key={`${index.toString()}`} width="17" height="16" aria-hidden="true">
          <use data-testid={'star'} xlinkHref={`${index + 1 <= evaluation ? '#icon-full-star' : '#icon-star'}`}></use>
        </svg>))
      :
      <LoadingScreen/>}
    <p className="visually-hidden">Рейтинг: {evaluation}</p>
    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{rate}</p>
  </div>
);
