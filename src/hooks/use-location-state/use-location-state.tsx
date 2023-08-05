import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { QueryParam } from '../../pages/catalog/types';
import { FilterTypeType, FilterTypeLevel } from '../../store/products-api/types';

export const useLocationState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setArrayInParams = (newState: FilterTypeType[] | FilterTypeLevel[], key: 'types' | 'levels') => {
    searchParams.delete(key);
    newState.forEach((el: string) => {
      searchParams.append(key, el);
    });
  };

  const params = useMemo(() => {
    const sortBy = searchParams.get('sortBy') as unknown as QueryParam['sortBy'];
    const sortOrder = searchParams.get('order') as unknown as QueryParam['order'];
    const category = searchParams.get('category') as unknown as QueryParam['category'];
    const types = searchParams.getAll('types') as unknown as QueryParam['types'];
    const levels = searchParams.getAll('levels') as unknown as QueryParam['levels'];
    const priceGte = searchParams.get('priceGte') as unknown as QueryParam['priceGte'];
    const priceLte = searchParams.get('priceLte') as unknown as QueryParam['priceLte'];

    const queryParams: QueryParam = {
      sortBy: null,
    };

    if (sortBy && sortOrder) {
      queryParams.sortBy = sortBy;
      queryParams.order = sortOrder;
    }
    if (category) { queryParams.category = category; }
    if (types?.length) { queryParams.types = types; }
    if (levels?.length) { queryParams.levels = levels; }
    if (priceGte) { queryParams.priceGte = priceGte; }
    if (priceLte) { queryParams.priceLte = priceLte; }

    return queryParams;
  }, [searchParams]);

  const changeSortBy = (newKey: QueryParam['sortBy']) => {
    if (newKey) {
      searchParams.set('sortBy', newKey);
      setSearchParams(searchParams);
    }
  };

  const changeSortOrder = (newKey: QueryParam['order']) => {
    if (newKey) {
      searchParams.set('order', newKey);
      setSearchParams(searchParams);
    }
  };

  const changFilterCategory = (newKey: QueryParam['category']) => {
    if (params.category === newKey) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else if (newKey) {
      searchParams.set('category', newKey);
      setSearchParams(searchParams);
    }
  };

  const resetFiltersTypes = () => {
    searchParams.delete('types');
    setSearchParams(searchParams);
  };

  const changFilterTypes = (newKey: FilterTypeType) => {
    if (params.types?.length && params.types?.includes(newKey)) {
      const newState = params.types.filter((type) => type !== newKey);
      if (newState.length === 0) {
        searchParams.delete('types');
      } else {
        setArrayInParams(newState, 'types');
      }
      setSearchParams(searchParams);
      return;
    }
    const newState = [...(params?.types || []), newKey];
    setArrayInParams(newState, 'types');
    setSearchParams(searchParams);
  };

  const changFilterLevels = (newKey: FilterTypeLevel) => {
    if (params.levels?.length && params.levels?.includes(newKey)) {
      const newState = params.levels.filter((level) => level !== newKey);
      if (newState.length === 0) {
        searchParams.delete('levels');
      } else {
        setArrayInParams(newState, 'levels');
      }
      setSearchParams(searchParams);
      return;
    }
    const newState = [...(params?.levels || []), newKey];
    setArrayInParams(newState, 'levels');
    setSearchParams(searchParams);
  };

  const changePriceGte = (newKey: QueryParam['priceGte']) => {
    if (!newKey) {
      searchParams.delete('priceGte');
    } else if (newKey) {
      searchParams.set('priceGte', newKey);
    }
    setSearchParams(searchParams);
  };

  const changePriceLte = (newKey: QueryParam['priceLte']) => {
    if (!newKey) {
      searchParams.delete('priceLte');
    } else if (newKey) {
      searchParams.set('priceLte', newKey);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    if(searchParams.get('category')){
      searchParams.delete('category');}
    if(searchParams.get('types')){
      searchParams.delete('types');}
    if(searchParams.get('levels')){
      searchParams.delete('levels');}
    if(searchParams.get('priceLte')){
      searchParams.delete('priceLte');}
    if(searchParams.get('priceGte')){
      searchParams.delete('priceGte');}
    setSearchParams(searchParams);
  };

  return {
    params,
    changeSortBy,
    changeSortOrder,
    changFilterCategory,
    changFilterTypes,
    resetFiltersTypes,
    changFilterLevels,
    changePriceGte,
    changePriceLte,
    resetFilters
  };
};
