import { useEffect, useState, KeyboardEvent } from 'react';
import { productsApi } from '../../store/products-api/products-api';
import { Product, Products } from '../../store/products-api/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../router/constants';

export const FormSearch = () => {
  const {data} = productsApi.useGetListQuery();
  const [search, setSearch] = useState <string | undefined>('');
  const [searchList, setSearchList] = useState <Products | undefined>(data);
  const navigate = useNavigate();

  const changeSearchHandler = (evt:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  const searchResults = (searchText:string | undefined, listNames:Products | undefined) => {
    if(!searchText){
      return [];
    }
    return listNames?.filter((item) => item.name.toLowerCase().replaceAll(' ', '').includes(searchText && searchText.replaceAll(' ', '').toLowerCase()
    ));
  };

  const navigationHandler = (product: Product) => {
    navigate(generatePath(AppRoute.Product, { id: product.id.toString() }));
    setSearch('');
  };

  const onResultKeyDown = (evt:KeyboardEvent<HTMLLIElement>, product:Product) => {
    if (evt.code === 'Enter') {
      navigationHandler(product);
    }
  };
  const onResultClick = (product: Product) => {
    navigationHandler(product);
  };

  useEffect(()=>{
    const debounce = setTimeout(()=>{
      const filteredNames = searchResults(search, data);
      setSearchList(filteredNames);
    }, 300);
    return () => clearTimeout(debounce);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search]);

  const clearButtonHandler = (item:string) => {
    setSearch(item);
  };

  return(
    <div className={!search ? `${'form-search'}` : `${'form-search list-opened'}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={(evt) => changeSearchHandler(evt)} value={search}/>
        </label>
        <ul className="form-search__select-list">
          {searchList?.map((item)=> <li className="form-search__select-item" tabIndex={0} key={item.id} onKeyDown={(evt) => onResultKeyDown(evt, item)} onClick={() => onResultClick(item)}>{item.name}</li>)}
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={() => clearButtonHandler('')}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );};
