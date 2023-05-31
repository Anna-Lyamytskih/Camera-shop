import { productsApi } from '../../store/products-api/products-api';
import { useAppSelector } from '..';
import { getSortingOrder } from '../../utils/utils';

export const useGetSortProducts = () => {
  const {data} = productsApi.useGetListQuery();
  const sort = useAppSelector((state) => state.PRODUCT.filter);
  const sortingProduct = getSortingOrder(data, sort.order, sort.by);

  return sortingProduct;
};
