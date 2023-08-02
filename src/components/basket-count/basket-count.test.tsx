import { render, screen } from '@testing-library/react';
import { BasketCount } from './basket-count';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';

const mockStore = configureMockStore();
describe('Component: BasketCount', () => {
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
          <BasketCount />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-btn')).toBeInTheDocument();
  });
});
