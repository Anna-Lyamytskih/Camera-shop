import { useAppDispatch, useAppSelector } from '../../hooks';
import { changFilterCategory, resetFiltersTypes } from '../../store/filter-process/filter-process';
import { FilterTypeCategory } from '../../store/products-api/types';

const CategoryProduct = [
  {
    value: 'Фотокамера',
    name: 'Фотоаппарат',
    title: 'photocamera'
  },
  {
    value: 'Видеокамера',
    name:'Видеокамера',
    title: 'videocamera'
  }
];

export const FilterCategory = () => {
  const filter = useAppSelector((state) => state.FILTER.filter);

  const dispatch = useAppDispatch();

  const handleFilterClick = (filterName: FilterTypeCategory) => {
    if (filter.category === filterName) {
      dispatch(changFilterCategory(null));

      return;
    }
    dispatch(changFilterCategory(filterName));
    dispatch(resetFiltersTypes());
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {CategoryProduct.map((item)=>
        (
          <div className="custom-checkbox catalog-filter__item" key={item.title}>
            <label key={item.title} >
              <input checked={filter.category === item.name} type="checkbox" name={item.title} key={item.title} onChange={()=>handleFilterClick(item.name as FilterTypeCategory)}/>
              <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.value}</span>
            </label>
          </div>
        )
      )}
    </fieldset>
  );
};
