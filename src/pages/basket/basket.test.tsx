/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { Basket } from './basket';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { makeFakeProducts} from '../../utils/mocks';
import { setupApiStore } from '../../utils/mockStore';
import { Provider } from 'react-redux';
import { productsApi } from '../../store/products-api/products-api';
import { basketProcessSlice } from '../../store/basket-process/basket-process';

describe('Component: Basket', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeProducts = makeFakeProducts();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const storeRef = setupApiStore(productsApi, { BASKET: basketProcessSlice.reducer
    } as any);

    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <HelmetProvider>
            <Basket />
          </HelmetProvider>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
  });
});
