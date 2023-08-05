import { useLocationState } from '../../hooks/use-location-state/use-location-state';
import { SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import { CatalogSortingOrderProps } from './types';

export const CatalogSortingOrder = ({ id, value }: CatalogSortingOrderProps) => {
  const { params, changeSortBy, changeSortOrder } = useLocationState();

  const handleSortClick = (sortName: SortingTypeOrder) => {
    if (!params.sortBy) {
      changeSortBy(SortingTypeBy.Price);
    }

    changeSortOrder(sortName);
  };

  return (
    <div className={`catalog-sort__btn catalog-sort__btn--${id}`}>
      <input
        data-testid="catalog-sort"
        type="radio"
        id={id}
        name="sort-icon"
        checked={params.order === id}
        aria-label={value}
        onChange={() => handleSortClick(id as SortingTypeOrder)}
      />
      <label htmlFor={id}>
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#icon-sort"></use>
        </svg>
      </label>
    </div>
  );
};

export default CatalogSortingOrder;


