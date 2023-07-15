import { render, screen } from '@testing-library/react';
import { CatalogFilter } from './catalog-filter';
import { makeFakeProducts } from '../../utils/mocks';
import { NameSpace, Products } from '../../store/products-api/types';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';

const mockStore = configureMockStore([thunk]);

describe('Component: CatalogFilter', () => {
  const sortingProducts = makeFakeProducts();
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
        level:[]
      }}
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogFilter sortingProducts={sortingProducts as unknown as Products}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
