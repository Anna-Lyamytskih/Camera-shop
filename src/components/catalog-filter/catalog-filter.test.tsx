import { render, screen } from '@testing-library/react';
import { CatalogFilter } from './catalog-filter';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { setupApiStore } from '../../utils/mockStore';
import { productsApi } from '../../store/products-api/products-api';
import { makeFakeProducts } from '../../utils/mocks';

describe('Component: CatalogFilter', () => {
  const fakeProducts = makeFakeProducts();
  it('should render correctly', () => {
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const history = createMemoryHistory();
    const storeRef = setupApiStore(productsApi);
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <CatalogFilter />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
