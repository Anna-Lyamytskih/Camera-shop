import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CatalogSort } from './catalog-sort';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { NameSpace, SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';

const mockStore = configureMockStore([thunk]);

describe('Component: CatalogSort', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.ProductItem]:{
        filter:
      {
        by: SortingTypeBy.Price,
        order: SortingTypeOrder.Up
      }}
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
