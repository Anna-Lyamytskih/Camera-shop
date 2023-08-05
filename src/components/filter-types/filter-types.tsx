import { useLocationState } from '../../hooks/use-location-state/use-location-state';
import { FilterTypeCategory, FilterTypeType } from '../../store/products-api/types';

const filterTypes = [
  {
    title: 'digital',
    value: 'Цифровая'
  },
  {
    title: 'film',
    value: 'Плёночная'
  },
  {
    title: 'snapshot',
    value: 'Моментальная'
  },
  {
    title: 'collection',
    value: 'Коллекционная'
  }
];


export const FilterTypes = () => {
  const { params, changFilterTypes } = useLocationState();

  const isVideocamera = params.category === FilterTypeCategory.Videocamera;

  const handleFilterClick = (filterName: FilterTypeType) => {
    changFilterTypes(filterName);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {filterTypes.map((item) => (
        <div className="custom-checkbox catalog-filter__item" key={item.title}>
          <label key={item.title}>
            <input
              checked={(params.types || []).includes(item.value as FilterTypeType)}
              type="checkbox"
              key={item.title}
              name={item.title}
              onChange={() => handleFilterClick(item.value as FilterTypeType)}
              disabled={isVideocamera && (item.value === FilterTypeType.Snapshot || item.value === FilterTypeType.Film)}
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
