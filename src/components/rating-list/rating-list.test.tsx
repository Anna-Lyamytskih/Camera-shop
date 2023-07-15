import { render, screen } from '@testing-library/react';
import { makeFakeProducts } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { setupApiStore } from '../../utils/mockStore';
import { productsApi } from '../../store/products-api/products-api';
import { HistoryRouter } from '../history-router';
import { Provider } from 'react-redux';
import { RatingList } from './rating-list';

describe('Component: RatingList', () => {

  it('should render correctly', () => {
    const rating = [
      {
        title:'Отлично',
        value:'5'
      },
    ];

    const history = createMemoryHistory();
    const fakeProducts = makeFakeProducts();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));
    const storeRef = setupApiStore(productsApi);
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <RatingList rating={rating}/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByTestId('rating-list')).toBeInTheDocument();
  });
});
