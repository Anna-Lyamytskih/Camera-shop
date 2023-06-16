import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { BasketItem } from './basket-item';

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <BasketItem />
      </ProviderWrapper>
    );

    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
  });
});
