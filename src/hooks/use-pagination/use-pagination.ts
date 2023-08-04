import { LIMIT_PRODUCT, DEFAULT_PAGE_NUMBER } from '../../pages/catalog/constants';
import { UsePagination } from '../../pages/catalog/types';
import {useState } from 'react';

export const usePagination = ({ total, limit = LIMIT_PRODUCT }: {
  total: number;
  limit?: number;
}): UsePagination => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  // const [_total, _setTotal] = useState(total);
  // const [_limit] = useState(limit);
  const pagesCount = Math.ceil(total / limit);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNext = () => {
    setCurrentPage((prev) => prev + DEFAULT_PAGE_NUMBER);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => prev - DEFAULT_PAGE_NUMBER);
  };

  // useEffect(() => {
  //   _setTotal(total);
  // }, [total]);

  return { currentPage, paginate, goToNext, goToPrev, pagesCount, limit };
};
