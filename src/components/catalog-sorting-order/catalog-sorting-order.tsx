import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortingTypeOrder, changeSortOrder } from '../../store/products-api/products-process';

export enum SortingTypes {
  Up = 'up',
  Down = 'down',
}

export const catalogSortingOrderList = [
  {
    title: 'По возрастанию',
    value: SortingTypes.Up,
  },
  {
    title: 'По убыванию',
    value: SortingTypes.Down,
  },
];

type CatalogSortingOrderProps = {
  id: string;
  value:string;
}

const CatalogSortingOrder = ({id, value}:CatalogSortingOrderProps) => {
  const sort = useAppSelector((state) => state.PRODUCT.filter);

  const dispatch = useAppDispatch();

  const handleSortClick = (sortName: SortingTypeOrder) => {
    console.log(sortName);
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


