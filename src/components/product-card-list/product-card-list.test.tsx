/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render, screen } from '@testing-library/react';
import ProductCardList from './product-card-list';
import { makeFakeProducts} from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { setupApiStore } from '../../utils/mockStore';
import { productsApi } from '../../store/products-api/products-api';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { productProcessSlice } from '../../store/products-api/products-process';
import { promoApi } from '../../store/promo-api/promo-api';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { basketProcessSlice } from '../../store/basket-process/basket-process';

describe('Component: ProductCardList', () => {
  const fakeProducts = makeFakeProducts();
  it('should render correctly', () => {
    const cameras = makeFakeProducts();
    const history = createMemoryHistory();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const storeRef = setupApiStore(productsApi,
      {PRODUCT: productProcessSlice.reducer,
        promoApi: promoApi.reducer,
        reviewListApi: reviewListApi.reducer,
        BASKET: basketProcessSlice.reducer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <ProductCardList cameras={cameras}/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByTestId('test-product-card')).toBeInTheDocument();
  });
});
