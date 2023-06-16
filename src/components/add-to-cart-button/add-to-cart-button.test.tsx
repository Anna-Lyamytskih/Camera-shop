import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { AddToCartButton } from './add-to-cart-button';

describe('Component: AddToCartButton', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <AddToCartButton />
      </ProviderWrapper>
    );

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
