import { LIMIT_PRODUCT, MAX_COUNT_PAGE_PGINATION } from '../../pages/catalog/constants';
import { UsePagination } from '../../pages/catalog/types';
import { useEffect, useState } from 'react';

export const usePagination = ({ total, limit = LIMIT_PRODUCT }: {
  total: number;
  limit?: number;
}): UsePagination => {
  const [currentPage, setCurrentPage] = useState(MAX_COUNT_PAGE_PGINATION);
  const [_total, _setTotal] = useState(total);
  const [_limit] = useState(limit);
  const qty = Math.ceil(_total / _limit);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNext = () => {
    setCurrentPage((prev) => prev + MAX_COUNT_PAGE_PGINATION);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => prev - MAX_COUNT_PAGE_PGINATION);
  };

  useEffect(() => {
    _setTotal(total);
  }, [total]);

  return { currentPage, paginate, goToNext, goToPrev, qty, limit: _limit };
};
