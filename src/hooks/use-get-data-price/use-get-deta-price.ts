import { useEffect } from 'react';
import { useAppDispatch } from '..';
import { changMaxPrice, changMinPrice } from '../../store/filter-process/filter-process';
import { Products } from '../../store/products-api/types';
import { getPriceValidation } from '../../utils/utils';

export const useGetDataPrice = (items:Products) => {
  const { min: minPriceFilter, max: maxPriceFilter } = getPriceValidation(items);

  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(minPriceFilter && maxPriceFilter){
      dispatch(changMaxPrice(maxPriceFilter));
      dispatch(changMinPrice(minPriceFilter));
    }
  },[minPriceFilter, maxPriceFilter]);

  return {minPriceFilter, maxPriceFilter};
};
