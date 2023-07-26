import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { FilterPrice } from './filter-price';
import { makeFakeProducts } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

describe('Component: filterPrice', () => {
  const sortingProducts = makeFakeProducts();
  const resetFilters = false;
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Filter]:{
        filter:
      {
        maxPrice: 0,
        minPrice:0,
        category:null,
        type:[],
        level:[],
        max:0,
        min:0,
      }}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterPrice sortingProducts={sortingProducts} resetFilters={resetFilters}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
