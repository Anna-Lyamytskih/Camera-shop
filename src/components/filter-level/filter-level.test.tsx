import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { FilterLevel } from './filter-level';

const mockStore = configureMockStore([thunk]);

describe('Component: filterLevel', () => {
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
          <FilterLevel />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Уровень')).toBeInTheDocument();
  });
});
