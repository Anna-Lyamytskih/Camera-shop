import { render, screen } from '@testing-library/react';
import { ProductReviewForm } from './product-review-form';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { setupApiStore } from '../../utils/mockStore';
import { makeFakeProducts} from '../../utils/mocks';
import fetchMock from 'jest-fetch-mock';
import { reviewListApi } from '../../store/review-list-api/review-list-api';

describe('Component: ProductReviewForm', () => {
  const history = createMemoryHistory();
  const fakeProducts = makeFakeProducts();
  fetchMock.mockResponse(JSON.stringify(fakeProducts));
  const storeRef = setupApiStore(reviewListApi);

  const props = {
    isActive: true,
    setActive: jest.fn,
    camera:1,
    setActiveModal: jest.fn,
    scroll:3
  };

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <HelmetProvider>
            <ProductReviewForm isActive={props.isActive} setActive={props.setActive} camera={props.camera} setActiveModal={props.setActiveModal} scroll={props.scroll}/>
          </HelmetProvider>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Нужно оценить товар')).toBeInTheDocument();
  });
});
