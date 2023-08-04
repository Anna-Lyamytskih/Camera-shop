import { Link, useSearchParams } from 'react-router-dom';
import { PaginationProps } from './types';
import { AppRoute } from '../../router/constants';
import queryString from 'query-string';

export const Pagination = ({ item, paginate, currentPage }: PaginationProps) => {
  const [searchParams] = useSearchParams();

  const updateUrl = () => {
    const url = queryString.parse(searchParams.toString());

    delete url['page'];

    const newUrl = queryString.stringify(url);

    return newUrl && `&${newUrl}`;
  };

  return(
    <li className="pagination__item">
      <Link
        className={`pagination__link ${item === currentPage ? 'pagination__link--active' : ''}`}
        to={`${AppRoute.Root}?page=${item}${updateUrl()}`}
        onClick={() => {
          paginate(item);
        }}
      >
        {item}
      </Link>
    </li >
  );
};
