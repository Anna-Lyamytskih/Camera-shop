import { SortingTypeBy } from '../../store/products-api/types';

export const catalogSortList = [
  {
    title: 'по цене',
    value: SortingTypeBy.Price,
  },
  {
    title: 'по популярности',
    value: SortingTypeBy.Rate,
  },
];
