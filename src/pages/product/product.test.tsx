import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { DeepPartial } from '@reduxjs/toolkit';
import { ProviderWrapper, RootState, createMockStoreWithAPI } from '../../utils/test-jest';
import { productsApi } from '../../store/products-api/products-api';
import { makeFakeProducts } from '../../utils/mocks';
import Product from './product';

describe('Component: Product', () => {
  const history = createMemoryHistory();

  const fakeState: DeepPartial<RootState> = {
    [productsApi.endpoints.getList.useQuery.prototype]:{
      data: makeFakeProducts()
    }
  };

  const { fakeStore } = createMockStoreWithAPI(fakeState);
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProviderWrapper fakeStore={fakeStore}>
          <HelmetProvider>
            <Product />
          </HelmetProvider>
        </ProviderWrapper>
      </HistoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
