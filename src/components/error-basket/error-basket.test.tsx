import { render, screen } from '@testing-library/react';
import { ErrorBasket } from './error-basket';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';

const mockStore = configureMockStore();

describe('Component: ErrorBasket', () => {
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

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorBasket />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('При оформлении вашего заказа возникла ошибка')).toBeInTheDocument();
  });
});
