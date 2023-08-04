import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination';
import { PaginationListProps } from './types';
import queryString from 'query-string';
import { AppRoute } from '../../router/constants';

export const PaginationList = ({ pagination }: PaginationListProps) => {
  const { paginate, pagesCount, currentPage, goToNext, goToPrev } = pagination;
  const pageNumber = [];

  for (let i = 1; i <= pagesCount; i++) {
    pageNumber.push(i);
  }

  const [searchParams] = useSearchParams();

  const updateUrl = () => {
    const url = queryString.parse(searchParams.toString());

    delete url['page'];

    const newUrl = queryString.stringify(url);

    return newUrl && `&${newUrl}`;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage !== 1
            ? (
              <li className="pagination__item">
                <Link
                  className="pagination__link pagination__link--text"
                  onClick={() => {
                    goToPrev();
                  }}
                  to={`${AppRoute.Root}?page=${currentPage - 1}${updateUrl()}`}
                >
                  Назад
                </Link>
              </li>
            )
            : null
        }
        {pageNumber.map((item: number) => (
          <Pagination item={item} currentPage={currentPage} key={item} paginate={paginate} />
        ))}
        {
          currentPage !== pagesCount
            ? (
              <li className="pagination__item">
                <Link
                  className="pagination__link pagination__link--text"
                  onClick={() => {
                    goToNext();
                  }}
                  to={`${AppRoute.Root}?page=${currentPage + 1}${updateUrl()}`}
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
