import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { setupApiStore } from '../../utils/mockStore';
import { productsApi } from '../../store/products-api/products-api';
import { AnyAction } from '@reduxjs/toolkit';
import { SearchForm } from './search-form';
import { HistoryRouter } from '../history-router';

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const storeRef = setupApiStore(productsApi);
    storeRef.store
      .dispatch(
        productsApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      );

    render(
      <Provider store={storeRef.store}>
        <HistoryRouter history={history}>
          <SearchForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
