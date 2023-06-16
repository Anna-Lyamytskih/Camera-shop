import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import { makeFakerProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { productsApi } from '../../store/products-api/products-api';
import { Provider } from 'react-redux';
import { setupApiStore } from '../../utils/mockStore';
import { AnyAction } from '@reduxjs/toolkit';
import { makeFakeProducts} from '../../utils/mocks';
import fetchMock from 'jest-fetch-mock';

describe('Component: ProductCard', () => {
  const history = createMemoryHistory();
  const fakeProducts = makeFakeProducts();
  fetchMock.mockResponse(JSON.stringify(fakeProducts));
  const storeRef = setupApiStore(productsApi);
  storeRef.store
    .dispatch(
      productsApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
    );
  const camera = makeFakerProduct();
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <HelmetProvider>
            <ProductCard camera={camera} isActive={false}/>
          </HelmetProvider>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
