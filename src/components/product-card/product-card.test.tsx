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
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { basketProcessSlice } from '../../store/basket-process/basket-process';

const history = createMemoryHistory();
const camera = makeFakerProduct();
describe('Component: ProductCard', () => {

  const fakeProducts = makeFakeProducts();
  fetchMock.mockResponse(JSON.stringify(fakeProducts));
  const storeRef = setupApiStore(productsApi, { BASKET: basketProcessSlice.reducer,
    reviewListApi: reviewListApi.reducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  storeRef.store
    .dispatch(
      productsApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
    );
  it('should render correctly', () => {
    render(
      <Provider store={storeRef.store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductCard camera={camera} isActive={false}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
