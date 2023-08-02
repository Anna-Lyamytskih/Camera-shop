import React, { useEffect, useMemo, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ReactFocusLock from 'react-focus-lock';
import useKeyPress from '../../hooks/use-key-press/use-key-press';
import { productsApi } from '../../store/products-api/products-api';
import { AppRoute } from '../../router/constants';
import { SearchItem } from '../search-item';

export enum KeyCode {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape'
}

export const DISPLAYED_SEARCH_RESULT_COUNT = 4;

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCameraIndex, setCurrentCameraIndex] = useState(-1);

  const navigate = useNavigate();

  const listRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upArrow = useKeyPress({ targetKey: KeyCode.ArrowUp });
  const downArrow = useKeyPress({ targetKey: KeyCode.ArrowDown });
  const esc = useKeyPress({targetKey: KeyCode.Esc});

  const { data: cameras} = productsApi.useGetListQuery();

  const searchedCameras = useMemo(() =>
    cameras?.filter((camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase())), [cameras, searchQuery]);

  const isUpArrowPressed = searchQuery && (searchedCameras && searchedCameras.length && upArrow);
  const isDownArrowPressed = searchQuery && (searchedCameras && searchedCameras.length && downArrow);
  const isEscPressed = searchQuery && (searchedCameras && searchedCameras.length && esc);

  useEffect(() => {
    if ((searchedCameras && searchedCameras.length) && isUpArrowPressed) {
      setCurrentCameraIndex((prev) => (prev ? prev - 1 : prev));

      if (!currentCameraIndex) {
        inputRef.current?.focus();
        setCurrentCameraIndex(-1);
      }

    } else if ((searchedCameras && searchedCameras.length) && isDownArrowPressed) {
      setCurrentCameraIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpArrowPressed, isDownArrowPressed, searchedCameras?.length]);

  useEffect(()=> {
    if ((searchedCameras && searchedCameras.length) && isEscPressed) {
      handleResetClick();}
  },[isEscPressed, searchedCameras?.length]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  const handleResetClick = () => {
    setSearchQuery('');
  };

  const onSearchItemClick = (cameraId: number) => {
    navigate(generatePath(AppRoute.Product, {id: String(cameraId)}));

    setSearchQuery('');
  };

  return (
    <div
      className={clsx('form-search', (searchedCameras && searchedCameras.length) && searchQuery && 'list-opened')}
      ref={listRef}
      tabIndex={-1}
      data-testid="search-form"
    >
      <ReactFocusLock disabled={!searchQuery}>
        <form onSubmit={(evt) => { evt.preventDefault(); }}>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
              value={searchQuery}
              onChange={handleChange}
              ref={inputRef}
            />
          </label>
          <ul className={clsx('form-search__select-list', searchedCameras && searchedCameras.length > DISPLAYED_SEARCH_RESULT_COUNT && 'scroller')}>
            {searchedCameras?.map((camera, i) => {
              const isCurrent = i === currentCameraIndex;

              return (
                <SearchItem
                  camera={camera}
                  isCurrent={isCurrent}
                  key={camera.id}
                  onClick={onSearchItemClick}
                />
              );
            }
            )}
          </ul>
        </form>
        <button
          className="form-search__reset"
          type="reset"
          onClick={handleResetClick}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
};
