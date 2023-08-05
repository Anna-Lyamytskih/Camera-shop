import { useLocationState } from '../../hooks/use-location-state/use-location-state';
import { FilterTypeLevel } from '../../store/products-api/types';

export const fillterLevels = [
  {
    title: 'zero',
    value: 'Нулевой'
  },
  {
    title: 'non-professional',
    value: 'Любительский'
  },
  {
    title: 'professional',
    value: 'Профессиональный'
  }
];

export const FilterLevel = () => {
  const { params, changFilterLevels } = useLocationState();

  const handleFilterClick = (filterName: FilterTypeLevel) => {
    changFilterLevels(filterName);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {fillterLevels.map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item.title}>
          <label key={item.title}>
            <input
              checked={(params.levels || []).includes(item.value as FilterTypeLevel)}
              type="checkbox"
              key={item.title}
              name={item.title}
              onChange={() => handleFilterClick(item.value as FilterTypeLevel)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{item.value}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
};
