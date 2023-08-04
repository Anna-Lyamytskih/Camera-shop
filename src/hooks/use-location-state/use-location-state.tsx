import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useMemo } from 'react';
import { changeSortBy, changeSortOrder } from '../../store/products-api/products-process';
import { FilterTypeCategory, FilterTypeLevel, FilterTypeTypes, SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import {
  changFilterCategory, changFilterMaxPrice, changFilterMinPrice,
  setInitialTypes, setInitialLevel,
} from '../../store/filter-process/filter-process';
import { QueryParam } from '../../pages/catalog/types';

export const useLocationState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = useAppSelector((state) => state.PRODUCT.filter);
  const filter = useAppSelector((state) => state.FILTER.filter);

  const currentParams = useMemo(() => {
    const params: QueryParam = {};

    if (sort.by && sort.order) {
      params.sortBy = sort.by;
      params.order = sort.order;
    } else if (!filter.category && !filter.type.length && !filter.level.length && !filter.minPrice && !filter.maxPrice) {
      return;
    }
    if (filter.category) { params.category = filter.category; }
    if (filter.type) { params.type = filter.type; }
    if (filter.level) { params.level = filter.level; }
    if (filter.minPrice) { params['price_gte'] = filter.minPrice.toString(); }
    if (filter.maxPrice) { params['price_lte'] = filter.maxPrice.toString(); }

    return params;
  }, [sort.by, sort.order, filter.category, filter.type, filter.level, filter.minPrice, filter.maxPrice]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchParams(currentParams);
  }, [filter, sort]);

  useEffect(() => {
    const sortType = searchParams.get('sortBy');
    const sortOrder = searchParams.get('order');
    const category = searchParams.get('category');
    const priceGte = searchParams.get('price_gte');
    const priceLte = searchParams.get('price_lte');
    const type: string[] = [];
    const level: string[] = [];

    for (const [key, value] of searchParams.entries()) {
      if (key === 'type' && !type.includes(value)) {
        type.push(value);
      }

      if (key === 'level' && !level.includes(value)) {
        level.push(value);
      }
    }

    if (sortType) {
      dispatch(changeSortBy(sortType as SortingTypeBy));
    }

    if (sortOrder) {
      dispatch(changeSortOrder(sortOrder as SortingTypeOrder));
    }

    if (priceGte) {
      dispatch(changFilterMinPrice(+priceGte));
    }
    if (priceLte) {
      dispatch(changFilterMaxPrice(+priceLte));
    }

    if (category) {
      dispatch(changFilterCategory(category as FilterTypeCategory | null));
    }

    if (type.length) {
      dispatch(setInitialTypes(type as unknown as FilterTypeTypes[]));
    }

    if (level.length) {
      dispatch(setInitialLevel(level as unknown as FilterTypeLevel[]));
    }
  }, []);
};
