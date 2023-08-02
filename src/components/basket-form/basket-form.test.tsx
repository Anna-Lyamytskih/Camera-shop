import { render, screen } from '@testing-library/react';
import { BasketForm } from './basket-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';

const mockStore = configureMockStore();

describe('Component: BasketForm', () => {
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
          <BasketForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });
});
