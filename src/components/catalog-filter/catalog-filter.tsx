import { useAppDispatch } from '../../hooks';
import { resetFilters } from '../../store/filter-process/filter-process';
import { Products } from '../../store/products-api/types';
import { FilterCategory } from '../filter-category';
import { FilterLevel } from '../filter-level';
import { FilterPrice } from '../filter-price';
import { FilterTypes } from '../filter-types';

type CatalogFilterProps = {
  sortingProducts:Products;
}

export const CatalogFilter = ({sortingProducts}:CatalogFilterProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetFilters());
  };

  return(
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <FilterPrice sortingProducts={sortingProducts}/>
      <FilterCategory/>
      <FilterTypes/>
      <FilterLevel/>
      <button
        onClick={handleClick}
        className="btn catalog-filter__reset-btn"
        type="reset"
      >Сбросить фильтры
      </button>
    </form>
  );
};
