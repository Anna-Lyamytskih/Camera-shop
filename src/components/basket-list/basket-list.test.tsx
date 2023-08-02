import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { BasketList } from './basket-list';
import { makeFakeProducts } from '../../utils/mocks';

const mockStore = configureMockStore();
const camera = makeFakeProducts();
describe('Component: BasketList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Basket]: {
        basketProducts: camera,
        coupon: null,
        discount: 0,
        orderStatus: Status.Idle,
        totalCount: 0
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-list')).toBeInTheDocument();
  });
});
