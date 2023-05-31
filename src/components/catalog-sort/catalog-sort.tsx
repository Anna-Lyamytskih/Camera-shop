import CatalogSortingItem, { catalogSortList } from '../catalog-sorting-item/catalog-sorting-item';
import CatalogSortingOrder, { catalogSortingOrderList } from '../catalog-sorting-order/catalog-sorting-order';

const CatalogSort = () => (
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

export default CatalogSort;
