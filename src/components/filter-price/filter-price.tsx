/* eslint-disable no-nested-ternary */
import { KeyboardEvent, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector, } from '../../hooks';
import { Products } from '../../store/products-api/types';
import { changFilterMaxPrice, changFilterMinPrice} from '../../store/filter-process/filter-process';
import { useGetDataPrice } from '../../hooks/use-get-data-price/use-get-deta-price';
import { productsApi } from '../../store/products-api/products-api';
import { getPriceValidation } from '../../utils/utils';
import { useSearchParams } from 'react-router-dom';

enum FilterPricesValue {
  From = 'from',
  To = 'to',
}

const filterPrices = [
  {
    title: 'priceFrom',
    key: FilterPricesValue.From,
  },
  {
    title: 'priceTo',
    key: FilterPricesValue.To,
  }
];

type FilterPriceProps = {
  sortingProducts: Products;
  resetFilters: boolean;
}

export const FilterPrice = ({ sortingProducts, resetFilters }: FilterPriceProps) => {
  const filter = useAppSelector((state) => state.FILTER.filter);

  const [searchParams] = useSearchParams();

  const priceGte = searchParams.get('price_gte');
  const priceLte = searchParams.get('price_lte');

  const dispatch = useAppDispatch();

  const {minPriceFilter, maxPriceFilter} = useGetDataPrice(sortingProducts);

  const { data } = productsApi.useGetListQuery();
  const { min: minPriceAll, max: maxPriceAll } = getPriceValidation(data);

  const defaultValues = {
    min: minPriceFilter,
    max: maxPriceFilter,
  };

  const [minValue, setMinPriceValue] = useState(filter.minPrice);
  const [maxValue, setMaxPriceValue] = useState(filter.maxPrice);

  const handlePrice = (evt: React.ChangeEvent<HTMLInputElement>, price: string) => {
    const priceValue = +evt.target.value < 0 ? '' : evt.target.value;
    switch (price) {
      case FilterPricesValue.From:{ return setMinPriceValue(Number(priceValue));}
      case FilterPricesValue.To:{ return setMaxPriceValue(Number(priceValue));}
    }
  };
  useEffect(()=>{
    if(!minValue && priceGte){
      setMinPriceValue(+priceGte);
    }
    if(!maxValue && priceLte){
      setMaxPriceValue(+priceLte);
    }
  },[minValue, priceGte, maxValue, priceLte]);

  useEffect(() => {
    if (resetFilters) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [resetFilters]);

  const handleMinPriceBlur = () => {
    if (!minValue) {
      setMinPriceValue(0);
      dispatch(changFilterMinPrice(0));
      return;
    }
    if(minValue && filter.min === minPriceAll && minValue < minPriceAll){
      setMinPriceValue(minPriceAll);
      dispatch(changFilterMinPrice(minPriceAll));
      return;
    }
    if(maxValue && minValue > maxValue){
      setMinPriceValue(maxValue);
      dispatch(changFilterMinPrice(maxValue));
      return;
    }
    if(minValue > minPriceFilter && minValue < maxPriceFilter){
      setMinPriceValue(minValue);
      dispatch(changFilterMinPrice(minValue));
      return;
    }
    if(minValue < minPriceFilter) {
      setMinPriceValue(minPriceFilter);
      dispatch(changFilterMinPrice(minPriceFilter));
      return;
    }
    if(minValue > maxPriceFilter) {
      setMinPriceValue(maxPriceFilter);
      dispatch(changFilterMinPrice(maxPriceFilter));
      return;
    }
    dispatch(changFilterMinPrice(minValue));
  };

  const handleMaxPriceBlur = () => {
    if (!maxValue) {
      setMaxPriceValue(0);
      dispatch(changFilterMaxPrice(0));
      return;
    }
    if(maxValue && filter.max === maxPriceAll && maxValue > maxPriceAll){
      setMaxPriceValue(maxPriceAll);
      dispatch(changFilterMaxPrice(maxPriceAll));
      return;
    }
    if(maxValue && maxValue < minValue){
      setMaxPriceValue(minValue);
      dispatch(changFilterMaxPrice(minValue));
      return;
    }
    if (maxValue > maxPriceFilter) {
      setMaxPriceValue(maxPriceFilter);
      dispatch(changFilterMaxPrice(maxPriceFilter));
      return;
    }
    if (maxValue < minValue) {
      setMaxPriceValue(minValue);
      dispatch(changFilterMaxPrice(minValue));
      return;
    }

    dispatch(changFilterMaxPrice(maxValue));
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      handleMinPriceBlur();
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      handleMaxPriceBlur();
    }
  };
  useEffect(()=>{
    if(filter.maxPrice === 0){
      dispatch(changFilterMaxPrice(Infinity));
    }
  },[filter.maxPrice]);

  const minPriceValue = minValue === 0 ? '' : String(minValue);
  const maxPriceValue = maxValue === 0 ? '' : String(maxValue);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        {filterPrices.map((item) => (
          <div className="custom-input" key={item.title}>
            <label key={item.title}>
              <input
                type="number"
                key={item.title}
                name={item.title}
                placeholder={
                  item.title === 'priceFrom' ?
                    (defaultValues.min === 0 ? String(filter.min) : String(defaultValues.min))
                    :
                    (defaultValues.max === 0 ? String(filter.max) : String(defaultValues.max))
                }
                value={item.title === 'priceFrom' ? minPriceValue : maxPriceValue}
                onChange={(evt) => handlePrice(evt, item.key)}
                onBlur={item.title === 'priceFrom' ? handleMinPriceBlur : handleMaxPriceBlur}
                onKeyDown={item.title === 'priceFrom' ? handleMinPriceKeyDown : handleMaxPriceKeyDown}
              />
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
