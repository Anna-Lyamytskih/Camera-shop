import { useLocationState } from '../../hooks/use-location-state/use-location-state';
import { FilterTypeCategory } from '../../store/products-api/types';

const CategoryProduct = [
  {
    value: 'Фотокамера',
    name: 'Фотоаппарат',
    title: 'photocamera'
  },
  {
    value: 'Видеокамера',
    name: 'Видеокамера',
    title: 'videocamera'
  }
];

export const FilterCategory = () => {
  const { params, changFilterCategory, resetFiltersTypes } = useLocationState();

  const handleFilterClick = (filterName: FilterTypeCategory) => {
    changFilterCategory(filterName);
    resetFiltersTypes();
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {CategoryProduct.map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item.title}>
          <label key={item.title} >
            <input
              checked={params.category === item.name}
              type="checkbox"
              name={item.title}
              key={item.title}
              onChange={() => handleFilterClick(item.name as FilterTypeCategory)}
            />
            <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.value}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
};
