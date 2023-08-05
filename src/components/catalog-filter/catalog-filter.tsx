import { FilterCategory } from '../filter-category';
import { FilterLevel } from '../filter-levels';
import { FilterPrice } from '../filter-price';
import { FilterTypes } from '../filter-types';
import { useLocationState } from '../../hooks/use-location-state/use-location-state';

export const CatalogFilter = () => {
  const {resetFilters} = useLocationState();

  const handleClick = () => {
    resetFilters();
  };

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <FilterPrice/>
      <FilterCategory />
      <FilterTypes />
      <FilterLevel />
      <button
        onClick={handleClick}
        className="btn catalog-filter__reset-btn"
        type="reset"
      >Сбросить фильтры
      </button>
    </form>
  );
};
