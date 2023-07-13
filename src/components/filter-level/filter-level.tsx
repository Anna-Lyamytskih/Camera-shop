import { useAppDispatch, useAppSelector } from '../../hooks';
import { changFilterLevel } from '../../store/filter-process/filter-process';
import { FilterTypeLevel } from '../../store/products-api/types';

export const fillterLevels = [
  {
    title:'zero',
    value:'Нулевой'
  },
  {
    title:'non-professional',
    value:'Любительский'
  },
  {
    title:'professional',
    value:'Профессиональный'
  }
];

export const FilterLevel = () => {
  const filter = useAppSelector((state) => state.FILTER.filter);

  const dispatch = useAppDispatch();

  const handleFilterClick = (filterName: FilterTypeLevel) => {
    dispatch(changFilterLevel(filterName));
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {fillterLevels.map((item)=>
        (
          <div className="custom-checkbox catalog-filter__item" key={item.title}>
            <label key={item.title}>
              <input checked={filter.level.includes(item.value as FilterTypeLevel)} type="checkbox" key={item.title} name={item.title} onChange={()=>handleFilterClick(item.value as FilterTypeLevel)}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{item.value}</span>
            </label>
          </div>
        )
      )}
    </fieldset>
  );
};
