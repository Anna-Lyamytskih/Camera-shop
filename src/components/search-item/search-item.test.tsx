import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakerProduct } from '../../utils/mocks';
import { HistoryRouter } from '../history-router';
import { SearchItem } from './search-item';

const mockStore = configureMockStore();
const camera = makeFakerProduct();

describe('Component: SearchItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchItem camera={camera} isCurrent onClick={() => jest.fn()} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});
