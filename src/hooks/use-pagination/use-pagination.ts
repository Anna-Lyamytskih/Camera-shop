import { useSearchParams } from 'react-router-dom';
import { LIMIT_PRODUCT, DEFAULT_PAGE_NUMBER } from '../../pages/catalog/constants';
import { UsePagination } from '../../pages/catalog/types';

export const usePagination = ({ total, limit = LIMIT_PRODUCT }: {
  total: number;
  limit?: number;
}): UsePagination => {
  const [searchParams] = useSearchParams();
  const currentPages = searchParams.get('page') ? Number(searchParams.get('page')) : DEFAULT_PAGE_NUMBER;

  const pagesCount = Math.ceil(total / limit);

  return { currentPages, pagesCount, limit };
};
