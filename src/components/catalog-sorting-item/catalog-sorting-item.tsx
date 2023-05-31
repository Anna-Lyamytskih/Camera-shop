import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortingTypeBy, changeSortBy } from '../../store/products-api/products-process';

export const catalogSortList = [
  {
    title: 'по цене',
    value: SortingTypeBy.Price,
  },
  {
    title: 'по популярности',
    value: SortingTypeBy.Rate,
  },
];

type CatalogSortingItemProps = {
  id: string;
  value:string;
}

const CatalogSortingItem = ({id, value}:CatalogSortingItemProps) => {
  const sort = useAppSelector((state) => state.PRODUCT.filter);

  const dispatch = useAppDispatch();

  const handleSortClick = (sortName: SortingTypeBy) => {
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

export default CatalogSortingItem;

