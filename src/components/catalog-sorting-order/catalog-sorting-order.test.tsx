import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { NameSpace, SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import CatalogSortingOrder from './catalog-sorting-order';

const mockStore = configureMockStore([thunk]);

describe('Component: CatalogSortingIOrder', () => {

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
          <CatalogSortingOrder id={'По возрастанию'} value={SortingTypeOrder.Up}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
