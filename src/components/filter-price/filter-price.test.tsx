import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { FilterPrice } from './filter-price';
import { makeFakeProducts } from '../../utils/mocks';
import { setupApiStore } from '../../utils/mockStore';
import { productsApi } from '../../store/products-api/products-api';

describe('Component: filterPrice', () => {
  const fakeProducts = makeFakeProducts();
  it('should render correctly', () => {
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const history = createMemoryHistory();
    const storeRef = setupApiStore(productsApi);
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <FilterPrice />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
