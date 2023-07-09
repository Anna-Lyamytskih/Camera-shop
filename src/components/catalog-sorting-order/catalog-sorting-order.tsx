import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortBy, changeSortOrder } from '../../store/products-api/products-process';
import { SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import { CatalogSortingOrderProps } from './types';

export const CatalogSortingOrder = ({id, value}:CatalogSortingOrderProps) => {
  const sort = useAppSelector((state) => state.PRODUCT.filter);

  const dispatch = useAppDispatch();

  const handleSortClick = (sortName: SortingTypeOrder) => {
    if(!sort.by){
      dispatch(changeSortBy(SortingTypeBy.Price));
    }

    dispatch(changeSortOrder(sortName));
  };

  return (
    <div className={`catalog-sort__btn catalog-sort__btn--${id}`}>
      <input
        type="radio"
        id={id}
        name="sort-icon"
        checked={sort.order === id}
        aria-label={value}
        onChange={() => handleSortClick(id as SortingTypeOrder)}
      />
      <label htmlFor={id}>
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#icon-sort"></use>
        </svg>
      </label>
    </div>
  );};

export default CatalogSortingOrder;


