import { productsApi } from '../../store/products-api/products-api';
import { getSortingOrder } from '../../utils/utils';
import { Product} from '../../store/products-api/types';
import { useGetDataWithReview } from '../use-get-data-with-review/use-get-data-with-review';
import { useGetFilterProducts } from '../use-get-filter-products/use-get-filter-products';
import { useLocationState } from '../use-location-state/use-location-state';

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
  filterProducts: Product[];
  isLoading: boolean;
} => {
  const {params} = useLocationState();
  const { data, isLoading: isLoadingList } = productsApi.useGetListQuery();
  const { dataFinal, inProgress } = useGetDataWithReview({ data });
  const isLoading = isLoadingList || inProgress;
  const sortingProducts = getSortingOrder(dataFinal, params.order, params.sortBy);
  const {filterProducts} = useGetFilterProducts(sortingProducts);

  return { filterProducts, isLoading };
};
