import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { ProductRate } from './product-rate';

describe('Component: ProductRate', () => {

  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <ProductRate />
      </ProviderWrapper>
    );

    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
