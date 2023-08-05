import { Products } from '../../store/products-api/types';
import { getFilterProducts } from '../../utils/utils';
import { useLocationState } from '../use-location-state/use-location-state';

export const useGetFilterProducts = (products:Products) =>{
  const {params} = useLocationState();

  const filterProducts = getFilterProducts(products, params.category, params.levels, params.types, params.priceGte, params.priceLte);

  return {filterProducts};
};
