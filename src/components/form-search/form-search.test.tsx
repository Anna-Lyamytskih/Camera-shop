import { render, screen } from '@testing-library/react';
import { FormSearch } from './form-search';
import { createMemoryHistory } from 'history';
import { makeFakeProducts } from '../../utils/mocks';
import { setupApiStore } from '../../utils/mockStore';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { productsApi } from '../../store/products-api/products-api';

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeProducts = makeFakeProducts();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const storeRef = setupApiStore(productsApi);
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <FormSearch />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
