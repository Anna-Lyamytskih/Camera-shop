import { SortingProductKey, SortingTypeOrder, FilterTypeCategory, FilterTypeLevel, FilterTypeType } from '../../store/products-api/types';

export type UsePagination = {
  currentPages: number;
  pagesCount: number;
  limit: number;
}

export type QueryParam = {
  sortBy: SortingProductKey | null;
  order?: SortingTypeOrder;
  category?: FilterTypeCategory;
  types?: FilterTypeType[];
  levels?: FilterTypeLevel[];
  priceGte?: string;
  priceLte?: string;
};
