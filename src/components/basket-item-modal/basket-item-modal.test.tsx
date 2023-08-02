import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakerProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { BasketItemModal } from './basket-item-modal';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();
const camera = makeFakerProduct();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: BasketItemModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItemModal
            camera={camera}
            isOpen={isOpen}
            onCloseCLick={onClose}
            setOpenedAddSuccessModal={() => { String(isOpen); }}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
