import { Banner } from './banner';
import { RootState, createMockStoreWithAPI } from '../../utils/test-jest';
import { ProviderWrapper } from '../../utils/test-jest';
import { DeepPartial } from '@reduxjs/toolkit';
import { promoApi } from '../../store/promo-api/promo-api';
import { render, screen } from '@testing-library/react';
import { makeFakePromo } from '../../utils/mocks';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const fakeState: DeepPartial<RootState> = {
      [promoApi.endpoints.getList.useQuery.prototype]:{
        data: makeFakePromo()
      }
    };

    const { fakeStore } = createMockStoreWithAPI(fakeState);

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Banner />
      </ProviderWrapper>
    );

    expect(screen.getByText('Профессиональная камера от известного производителя')).toBeInTheDocument();
    expect(screen.getByText('Новинка!')).toBeInTheDocument();
  });
});
