import { useLocationState } from '../../hooks/use-location-state/use-location-state';
import { SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import { CatalogSortingItemProps } from './types';

export const CatalogSortingItem = ({ id, value }: CatalogSortingItemProps) => {
  const { params, changeSortBy, changeSortOrder } = useLocationState();

  const handleSortClick = (sortName: SortingTypeBy) => {
    if (!params.order) {
      changeSortOrder(SortingTypeOrder.Up);
    }

    changeSortBy(sortName);
  };

  const getSortName = (sortName: string) => (
    sortName.replace(sortName[0], sortName[0].toLowerCase())
  );

  const sortName = getSortName(id);

  return (
    <div className="catalog-sort__btn-text">
      <input
        type="radio"
        checked={params.sortBy === sortName}
        onChange={() => handleSortClick(sortName as SortingTypeBy)}
        id={`'sort'${id}`}
        name="sort"
      />
      <label htmlFor={`'sort'${id}`}>{value}</label>
    </div>
  );
};
