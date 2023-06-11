import { SortingTypeOrder } from '../../store/products-api/types';

export const catalogSortingOrderList = [
  {
    title: 'По возрастанию',
    value: SortingTypeOrder.Up,
  },
  {
    title: 'По убыванию',
    value: SortingTypeOrder.Down,
  },
];
