import { useEffect, useState, useRef } from 'react';
import { productsApi } from '../../store/products-api/products-api';
import { Product, Products } from '../../store/products-api/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../router/constants';
import Select, { GroupBase, StylesConfig } from 'react-select';

export const FormSearch = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>(null);
  const { data } = productsApi.useGetListQuery();
  const [search, setSearch] = useState<string | undefined>('');
  const [searchList, setSearchList] = useState<Products | undefined>(data);
  const navigate = useNavigate();

  const changeSearchHandler = (value: string) => {
    setSearch(value);
  };

  const searchResults = (searchText: string | undefined, listNames: Products | undefined) => {
    if (!searchText) {
      return [];
    }
    return listNames?.filter((item) => item.name.toLowerCase().replaceAll(' ', '').includes(searchText && searchText.replaceAll(' ', '').toLowerCase()
    ));
  };

  const navigationHandler = (product: Product) => {
    navigate(generatePath(AppRoute.Product, { id: product.id.toString() }));
    setSearch('');
  };

  const onResultClick = (product: Product) => {
    navigationHandler(product);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredNames = searchResults(search, data);
      setSearchList(filteredNames);
    }, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const clearButtonHandler = (item: string) => {
    setSearch(item);
  };

  const options = searchList?.map((item) => ({ label: item.name, value: item.name, raw: item }));

  const customStyles: StylesConfig<string, false, GroupBase<string>> = {
    control: (provided) => ({
      ...provided,
      border: '0px solid',
      outline: 'none',
      boxShadow: '0px 0px',
    }),
    menu: (provided) => ({
      ...provided,
      left: '-43px',
      width: '280px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  return (
    <div className={!search ? `${'form-search'}` : `${'form-search list-opened'}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <Select
            className="form-search"
            isClearable
            options={options as unknown as string[]}
            onInputChange={(evt) => changeSearchHandler(evt)}
            value={search}
            ref={selectRef}
            onChange={(item) => {
              const typedItem = item as unknown as { raw: Product };
              onResultClick(typedItem.raw);
            }}
            onKeyDown={(evt) => {
              if (evt.code === 'Tab') {
                evt.preventDefault();
                evt.stopPropagation();
                if (evt.shiftKey === true) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  selectRef.current?.focusOption('up');
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  selectRef.current?.focusOption('down');
                }
              }
            }}
            components={{
              DropdownIndicator: () => null
            }}
            placeholder="Поиск по сайту"
            styles={customStyles}
            maxMenuHeight={170}
            noOptionsMessage={() => 'Ничего не найдено'}
          />
        </label>
      </form>
      <button className="form-search__reset" type="reset" onClick={() => clearButtonHandler('')}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};
