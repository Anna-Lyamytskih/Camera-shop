import { render, screen } from '@testing-library/react';
import { makeFakeProducts } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { setupApiStore } from '../../utils/mockStore';
import { productsApi } from '../../store/products-api/products-api';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { productProcessSlice } from '../../store/products-api/products-process';
import { promoApi } from '../../store/promo-api/promo-api';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { ReviewCardRateList } from './review-card-rate-list';

describe('Component: ReviewCardRateList', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeProducts = makeFakeProducts();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const storeRef = setupApiStore(productsApi,
      {PRODUCT: productProcessSlice.reducer,
        promoApi: promoApi.reducer,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reviewListApi: reviewListApi.reducer} as any);
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <ReviewCardRateList rate={1}/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Оценка: 1')).toBeInTheDocument();
  });
});
