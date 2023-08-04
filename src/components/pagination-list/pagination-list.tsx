import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination';
import { PaginationListProps } from './types';
import { AppRoute } from '../../router/constants';

export const PaginationList = ({ pagination }: PaginationListProps) => {
  const { pagesCount, currentPages} = pagination;
  const pageNumber = [];

  for (let i = 1; i <= pagesCount; i++) {
    pageNumber.push(i);
  }

  const [searchParams] = useSearchParams();

  const getUrl = (pageNumbers: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(pageNumbers));
    return newSearchParams.toString();
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPages !== 1
            ? (
              <li className="pagination__item">
                <Link
                  className="pagination__link pagination__link--text"
                  to={`${AppRoute.Root}?${getUrl(currentPages - 1)}`}
                >
                  Назад
                </Link>
              </li>
            )
            : null
        }
        {pageNumber.map((item: number) => (
          <Pagination item={item} currentPages={currentPages} key={item}/>
        ))}
        {
          currentPages !== pagesCount
            ? (
              <li className="pagination__item">
                <Link
                  className="pagination__link pagination__link--text"
                  to={`${AppRoute.Root}?${getUrl(currentPages + 1)}`}
                >
                  Вперед
                </Link>
              </li>
            )
            : null
        }
      </ul>
    </div>
  );
};
