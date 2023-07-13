import { useEffect, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector, } from '../../hooks';
import { getPriceValidation } from '../../utils/utils';
import { FilterPrices, Products } from '../../store/products-api/types';
import { changFilterMaxPrice, changFilterMinPrice } from '../../store/filter-process/filter-process';

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
  isReset: boolean;
}

export const FilterPrice = ({ sortingProducts, isReset }: FilterPriceProps) => {
  const filter = useAppSelector((state) => state.FILTER.filter);
  console.log('filter', filter);

  const dispatch = useAppDispatch();

  const { min: minPriceFilter, max: maxPriceFilter } = getPriceValidation(sortingProducts);

  const defaultValues = {
    min: minPriceFilter,
    max: maxPriceFilter,
  };
  console.log('defaultValues', defaultValues);
  // const [minPrice, setMinPrice] = useState(filter.minPrice);
  // const [maxPrice, setMaxPrice] = useState(filter.maxPrice);

  const handlePrice = (evt: React.ChangeEvent<HTMLInputElement>, price: string) => {
    const priceValue = +evt.target.value < 0 ? '' : evt.target.value;

    switch (price) {
      case FilterPricesValue.From: return dispatch(changFilterMinPrice(Number(priceValue)));
      case FilterPricesValue.To: return dispatch(changFilterMaxPrice(Number(priceValue)));
    }
  };

  // useEffect(() => {
  //   dispatch(changFilterMinPrice(+''));
  //   dispatch(changFilterMaxPrice(+''));
  // }, [defaultValues]);

  const handleMinPriceBlur = () => {
    console.log('handleMinPriceBlur', filter);
    // if (!filter.minPrice) {
    //   // setMinPrice(defaultValues.min);
    //   dispatch(changFilterMinPrice(defaultValues.min));
    //   return;
    // }
    if (filter.maxPrice < filter.minPrice) {
      // setMaxPrice(minPrice);
      dispatch(changFilterMaxPrice(filter.minPrice));
      return;
    }
    if (filter.minPrice < minPriceFilter) {
      // setMinPrice(minPriceFilter);
      dispatch(changFilterMinPrice(minPriceFilter));
      return;
    }
    if (filter.minPrice > maxPriceFilter) {
      // setMinPrice(maxPriceFilter);
      dispatch(changFilterMinPrice(maxPriceFilter));
      return;
    }
    dispatch(changFilterMinPrice(filter.minPrice));
  };

  const handleMaxPriceBlur = () => {
    console.log('handleMaxPriceBlur', filter);
    // if (!filter.maxPrice) {
    //   // setMaxPrice(defaultValues.max);
    //   dispatch(changFilterMaxPrice(defaultValues.max));
    //   return;
    // }
    console.log(1);
    if (filter.maxPrice < filter.minPrice) {
      // setMaxPrice(minPrice);
      dispatch(changFilterMaxPrice(filter.minPrice));
      return;
    }
    if (filter.maxPrice > maxPriceFilter) {
      // setMaxPrice(maxPriceFilter);
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
                placeholder={item.title === 'priceFrom' ? String(defaultValues.min) : String(defaultValues.max)}
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
