import { productsApi } from '../../store/products-api/products-api';
import { useAppSelector } from '..';
import { getSortingOrder } from '../../utils/utils';
import { Product} from '../../store/products-api/types';
import { useGetDataWithReview } from '../use-get-data-with-review/use-get-data-with-review';

export function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
}

export const useGetSortProducts = (): {
  sortingProducts: Product[];
  isLoading: boolean;
} => {
  const sort = useAppSelector((state) => state.PRODUCT.filter);
  const { data, isLoading: isLoadingList } = productsApi.useGetListQuery();
  const { dataFinal, inProgress } = useGetDataWithReview({ data });
  const isLoading = isLoadingList || inProgress;
  const sortingProducts = getSortingOrder(dataFinal, sort.order, sort.by);

  return { sortingProducts, isLoading };
};
