import { FilterCategory } from './filter-category';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';

const mockStore = configureMockStore([thunk]);

describe('Component: filterCategory', () => {
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
          <FilterCategory />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
