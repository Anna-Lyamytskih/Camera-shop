/* eslint-disable no-nested-ternary */
import { KeyboardEvent, useEffect} from 'react';
import { useAppDispatch, useAppSelector, } from '../../hooks';
import { Products } from '../../store/products-api/types';
import { changFilterMaxPrice, changFilterMinPrice} from '../../store/filter-process/filter-process';
import { useGetDataPrice } from '../../hooks/use-get-data-price/use-get-deta-price';

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
}

export const FilterPrice = ({ sortingProducts }: FilterPriceProps) => {
  const filter = useAppSelector((state) => state.FILTER.filter);

  const dispatch = useAppDispatch();

  const {minPriceFilter, maxPriceFilter} = useGetDataPrice(sortingProducts);

  const defaultValues = {
    min: minPriceFilter,
    max: maxPriceFilter,
  };

  const handlePrice = (evt: React.ChangeEvent<HTMLInputElement>, price: string) => {
    const priceValue = +evt.target.value < 0 ? '' : evt.target.value;
    switch (price) {
      case FilterPricesValue.From: return dispatch(changFilterMinPrice(Number(priceValue)));
      case FilterPricesValue.To: return dispatch(changFilterMaxPrice(Number(priceValue)));
    }
  };

  const handleMinPriceBlur = () => {
    if (filter.minPrice > filter.max) {
      dispatch(changFilterMinPrice(filter.max));
      return;
    }
    if (filter.minPrice < filter.min) {
      dispatch(changFilterMinPrice(filter.min));
      return;
    }
    if (filter.maxPrice < filter.minPrice) {
      dispatch(changFilterMaxPrice(filter.minPrice));
      return;
    }
    if (filter.minPrice > maxPriceFilter) {
      dispatch(changFilterMinPrice(maxPriceFilter));
      return;
    }
    dispatch(changFilterMinPrice(filter.minPrice));
  };

  const handleMaxPriceBlur = () => {
    if (filter.minPrice < filter.min) {
      dispatch(changFilterMinPrice(filter.min));
      return;
    }
    if (filter.maxPrice < filter.minPrice) {
      dispatch(changFilterMaxPrice(filter.minPrice));
      return;
    }
    if (filter.maxPrice > maxPriceFilter) {
      dispatch(changFilterMaxPrice(maxPriceFilter));
      return;
    }
    dispatch(changFilterMaxPrice(filter.maxPrice));
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

  const minPriceValue = filter.minPrice === 0 ? '' : String(filter.minPrice);
  const maxPriceValue = filter.maxPrice === 0 ? '' : String(filter.maxPrice);

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
