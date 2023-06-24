import { Banner } from './banner';
import { RootState, createMockStoreWithAPI } from '../../utils/test-jest';
import { ProviderWrapper } from '../../utils/test-jest';
import { DeepPartial } from '@reduxjs/toolkit';
import { promoApi } from '../../store/promo-api/promo-api';
import { render, screen } from '@testing-library/react';
import { makeFakePromo } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const fakeState: DeepPartial<RootState> = {
      [promoApi.endpoints.getList.useQuery.prototype]:{
        data: makeFakePromo()
      }
    };
    const history = createMemoryHistory();
    const { fakeStore } = createMockStoreWithAPI(fakeState);

    render(
      <HistoryRouter history={history}>
        <ProviderWrapper fakeStore={fakeStore}>
          <Banner />
        </ProviderWrapper>
      </HistoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
