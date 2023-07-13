import { useAppSelector } from '..';
import { Products } from '../../store/products-api/types';
import { getFilterProducts } from '../../utils/utils';

export const useGetFilterProducts = (products:Products) =>{
  const filter = useAppSelector((state) => state.FILTER.filter);

  const filterProducts = getFilterProducts(products, filter.category, filter.level, filter.type, filter.minPrice, filter.maxPrice);

  return {filterProducts};
};
