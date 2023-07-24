import { useAppDispatch, useAppSelector } from '../../hooks';
import { changFilterLTypes } from '../../store/filter-process/filter-process';
import { FilterTypeCategory, FilterTypeTypes } from '../../store/products-api/types';

const filterTypes = [
  {
    title:'digital',
    value:'Цифровая'
  },
  {
    title:'film',
    value:'Плёночная'
  },
  {
    title:'snapshot',
    value:'Моментальная'
  },
  {
    title:'collection',
    value:'Коллекционная'
  }
];


export const FilterTypes = () => {
  const filter = useAppSelector((state) => state.FILTER.filter);

  const isVideocamera = filter.category === FilterTypeCategory.Videocamera;

  const dispatch = useAppDispatch();

  const handleFilterClick = (filterName: FilterTypeTypes) => {
    dispatch(changFilterLTypes(filterName));
  };
  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {filterTypes.map((item)=>
        (
          <div className="custom-checkbox catalog-filter__item" key={item.title}>
            <label key={item.title}>
              <input
                checked={ isVideocamera ? false : filter.type.includes(item.value as FilterTypeTypes)}
                type="checkbox"
                key={item.title}
                name={item.title}
                onChange={()=>handleFilterClick(item.value as FilterTypeTypes)}
                disabled={isVideocamera && (item.value === FilterTypeTypes.Snapshot || item.value === FilterTypeTypes.Film)}
              />
              <span className="custom-checkbox__icon">
              </span>
              <span className="custom-checkbox__label">
                {item.value}
              </span>
            </label>
          </div>
        )
      )}
    </fieldset>
  );
};
