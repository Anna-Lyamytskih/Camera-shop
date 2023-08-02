import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { makeFakerProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { BasketItem, BasketItemType } from './basket-item';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const camera = makeFakerProduct();

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem camera={camera} type={BasketItemType.Standart} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
  });
});
