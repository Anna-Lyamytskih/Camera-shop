/* eslint-disable no-nested-ternary */
import { KeyboardEvent, useEffect, useState } from 'react';
import { Products } from '../../store/products-api/types';
import { productsApi } from '../../store/products-api/products-api';
import { getFilterProductsForPrice, getPriceValidation } from '../../utils/utils';
import { useLocationState } from '../../hooks/use-location-state/use-location-state';

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

const usePriceValues = ({ products }: {
  products: Products | undefined;
}) => {
  const { changePriceGte, changePriceLte } = useLocationState();
  const { min, max } = getPriceValidation(products);

  const [fromValue, setFrom] = useState<string>('');
  const [toValue, setTo] = useState<string>('');

  const setFromValue = (newState: string) => {
    setFrom(newState);
    changePriceGte(newState);
  };

  const setToValue = (newState: string) => {
    setTo(newState);
    changePriceLte(newState);
  };

  return {
    min, max,
    fromValue, setFromValue,
    toValue, setToValue,
  };
};

export const FilterPrice = ({ sortingProducts }: FilterPriceProps) => {
  const { params } = useLocationState();

  const filterTypes = params.types;
  const filterLevels = params.levels;
  const filterCategory = params.category;

  const { data } = productsApi.useGetListQuery();

  const productsFilter = getFilterProductsForPrice(data, filterCategory, filterLevels, filterTypes);
  const {
    min,
    max,
    fromValue,
    setFromValue,
    toValue,
    setToValue,
  } = usePriceValues({ products: productsFilter });

  const handlePrice = (evt: React.ChangeEvent<HTMLInputElement>, type: FilterPricesValue) => {
    const priceValue = +evt.target.value <= 0 ? '' : evt.target.value;
    switch (type) {
      case FilterPricesValue.From: { return setFromValue(priceValue); }
      case FilterPricesValue.To: { return setToValue(priceValue); }
    }
  };

  useEffect(() => {
    if (params.priceGte) {
      setFromValue(params.priceGte);
    }
    if (params.priceLte) {
      setToValue(params.priceLte);
    }
  }, []);

  const handleFromPriceBlur = () => {
    if (fromValue !== '' && toValue !== '' && +fromValue > +toValue) {
      setFromValue(toValue);
      return;
    }
    if (fromValue && fromValue !== '' && +fromValue < min) {
      setFromValue(`${min}`);
      return;
    }
    if (fromValue && fromValue !== '' && +fromValue > max) {
      setFromValue(`${max}`);

    }
  };

  const handleToPriceBlur = () => {
    if (toValue !== '' && fromValue !== '' && +toValue < +fromValue) {
      setToValue(fromValue);
      return;
    }
    if (toValue && toValue !== '' && +toValue < min) {
      setToValue(`${min}`);
      return;
    }
    if (toValue && toValue !== '' && +toValue > max) {
      setToValue(`${max}`);
    }
  };

  const handleFromPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      handleFromPriceBlur();
    }
  };

  const handleToPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      handleToPriceBlur();
    }
  };

  const from = +fromValue === 0 ? '' : String(fromValue);
  const to = +toValue === 0 ? '' : String(toValue);

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
                placeholder={item.title === 'priceFrom' ? String(min) : String(max)}
                value={item.title === 'priceFrom' ? from : to}
                onChange={(evt) => handlePrice(evt, item.key)}
                onBlur={item.title === 'priceFrom' ? handleFromPriceBlur : handleToPriceBlur}
                onKeyDown={item.title === 'priceFrom' ? handleFromPriceKeyDown : handleToPriceKeyDown}
              />
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
