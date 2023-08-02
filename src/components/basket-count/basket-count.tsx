import { Link } from 'react-router-dom';
import { AppRoute } from '../../router/constants';
import { useAppSelector } from '../../hooks';

export const BasketCount = () => {
  const basketCount = useAppSelector((state) => state.BASKET.totalCount);

  localStorage.setItem('totalCount-state', JSON.stringify(basketCount));

  return (
    <Link className="header__basket-link" to={AppRoute.Basket} data-testid="basket-btn">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basketCount ? <span className="header__basket-count">{basketCount}</span> : ''}
    </Link>
  );
};
