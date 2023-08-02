import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';
import { HistoryRouter } from '../history-router';
import { BasketOrderSuccessModal } from './basket-order-success-modal';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();

describe('Component: BasketOrderSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Basket]: {
        basketCameras: [],
        coupon: null,
        discount: 0,
        orderStatus: Status.Idle,
        totalCount: 0
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketOrderSuccessModal />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  });
});
