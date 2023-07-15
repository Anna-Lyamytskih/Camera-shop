import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../store/products-api/types';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router';
import { FilterTypes } from './filter-types';

const mockStore = configureMockStore([thunk]);

describe('Component: filterPrice', () => {
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
          <FilterTypes/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
  });
});
