/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { HistoryRouter } from '../../components/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { Catalog } from './catalog';
import { productsApi } from '../../store/products-api/products-api';
import { Provider } from 'react-redux';
import { setupApiStore } from '../../utils/mockStore';
import { makeFakeProducts} from '../../utils/mocks';
import fetchMock from 'jest-fetch-mock';
import { productProcessSlice } from '../../store/products-api/products-process';
import { promoApi } from '../../store/promo-api/promo-api';
import { createMemoryHistory } from 'history';

describe('Component: Catalog', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeProducts = makeFakeProducts();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const storeRef = setupApiStore(productsApi, {PRODUCT: productProcessSlice.reducer, promoApi: promoApi.reducer} as any);

    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <HelmetProvider>
            <Catalog />
          </HelmetProvider>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });});
