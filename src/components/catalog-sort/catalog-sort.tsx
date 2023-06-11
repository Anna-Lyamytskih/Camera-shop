import { CatalogSortingItem } from '../catalog-sorting-item';
import { catalogSortList } from '../catalog-sorting-item/constants';
import { CatalogSortingOrder } from '../catalog-sorting-order';
import { catalogSortingOrderList } from '../catalog-sorting-order/constants';

export const CatalogSort = () => (
  <form action="#">
    <div className="catalog-sort__inner">
      <p className="title title--h5">Сортировать:</p>
      <div className="catalog-sort__type">
        {catalogSortList.map((item)=> (<CatalogSortingItem id={item.value} value={item.title} key={item.value}/>))}
      </div>
      <div className="catalog-sort__order">
        {catalogSortingOrderList.map((item) => (<CatalogSortingOrder id={item.value} value={item.title} key={item.value}/>))}
      </div>
    </div>
  </form>
);
