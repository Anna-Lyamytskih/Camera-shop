import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortBy, changeSortOrder } from '../../store/products-api/products-process';
import { SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import { CatalogSortingItemProps } from './types';

export const CatalogSortingItem = ({id, value}:CatalogSortingItemProps) => {
  const sort = useAppSelector((state) => state.PRODUCT.filter);

  const dispatch = useAppDispatch();

  const handleSortClick = (sortName: SortingTypeBy) => {
    if(!sort.order){
      dispatch(changeSortOrder(SortingTypeOrder.Up));
    }

    dispatch(changeSortBy(sortName));
  };

  const getSortName = (sortName: string) => (
    sortName.replace(sortName[0], sortName[0].toLowerCase())
  );

  const sortName = getSortName(id);

  return(
    <div className="catalog-sort__btn-text">
      <input
        type="radio"
        checked={sort.by === sortName}
        onChange={() => handleSortClick(sortName as SortingTypeBy)}
        id={`'sort'${id}`}
        name="sort"
      />
      <label htmlFor={`'sort'${id}`}>{value}</label>
    </div>
  );};

