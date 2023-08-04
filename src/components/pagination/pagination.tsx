import { Link, useSearchParams } from 'react-router-dom';
import { PaginationProps } from './types';
import { AppRoute } from '../../router/constants';

export const Pagination = ({ item, currentPages }: PaginationProps) => {
  const [searchParams] = useSearchParams();

  const getUrl = (pageNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(pageNumber));
    return newSearchParams.toString();
  };

  return(
    <li className="pagination__item">
      <Link
        className={`pagination__link ${item === currentPages ? 'pagination__link--active' : ''}`}
        to={`${AppRoute.Root}?${getUrl(item)}`}
      >
        {item}
      </Link>
    </li >
  );
};
