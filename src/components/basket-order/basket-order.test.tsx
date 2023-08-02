import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { BasketOrder } from './basket-oder';

const mockStore = configureMockStore();

describe('Component: BasketOrder', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Basket]: {
        basketProducts: [],
        coupon: null,
        discount: 0,
        orderStatus: Status.Idle,
        totalCount: 0
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketOrder />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
  });
});
