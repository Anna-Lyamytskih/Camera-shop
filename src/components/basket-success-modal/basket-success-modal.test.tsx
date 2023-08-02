import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Status } from '../../store/basket-process/const';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BasketSuccessModal } from './basket-success-modal';

const mockStore = configureMockStore();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: BasketSuccessModal', () => {
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
          <BasketSuccessModal
            isOpen={isOpen}
            onCloseCLick={onClose}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});
