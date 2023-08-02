import { render, screen } from '@testing-library/react';
import { ProductSlider } from './product-slider';
import { makeFakeProducts} from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { setupApiStore } from '../../utils/mockStore';
import { productProcessSlice } from '../../store/products-api/products-process';
import { productsApi } from '../../store/products-api/products-api';
import { promoApi } from '../../store/promo-api/promo-api';
import { filterProcessSlice } from '../../store/filter-process/filter-process';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { basketProcessSlice } from '../../store/basket-process/basket-process';

describe('Component: ProductSlider', () => {
  const history = createMemoryHistory();
  const fakeProducts = makeFakeProducts();
  fetchMock.mockResponse(JSON.stringify(fakeProducts));
  const storeRef = setupApiStore(productsApi,
    {PRODUCT: productProcessSlice.reducer,
      promoApi: promoApi.reducer,
      FILTER: filterProcessSlice.reducer,
      reviewListApi: reviewListApi.reducer,
      BASKET: basketProcessSlice.reducer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

  const props = {
    slides: makeFakeProducts(),
  };
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <ProductSlider slides={props.slides}/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByLabelText('Следующий слайд')).toBeInTheDocument();
  });
});
