import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../router/constants';

export const Logo = () => {
  const link = generatePath(AppRoute.Root);

  return(
    <Link className="header__logo" to={link} aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref="#icon-logo"></use>
      </svg>
    </Link>
  );
};
