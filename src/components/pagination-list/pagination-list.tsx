import { Pagination } from '../pagination';
import { PaginationListProps } from './types';

export const PaginationList = ({ pagination }: PaginationListProps) => {
  const { paginate, qty, currentPage, goToNext, goToPrev } = pagination;
  const pageNumber = [];

  for (let i = 1; i <= qty; i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage !== 1
            ? (
              <li className="pagination__item">
                <a
                  className="pagination__link pagination__link--text"
                  onClick={(evt) => {
                    evt.preventDefault();
                    goToPrev();
                  }}
                  href="/prev"
                >
                  Назад
                </a>
              </li>
            )
            : null
        }
        {pageNumber.map((item: number) => (
          <Pagination item={item} currentPage={currentPage} key={item} paginate={paginate} />
        ))}
        {
          currentPage !== qty
            ? (
              <li className="pagination__item">
                <a
                  className="pagination__link pagination__link--text"
                  onClick={(evt) => {
                    evt.preventDefault();
                    goToNext();
                  }}
                  href="/next"
                >
                  Вперед
                </a>
              </li>
            )
            : null
        }
      </ul>
    </div>
  );
};
