import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { BasketForm } from './basket-form';

describe('Component: BasketForm', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <BasketForm />
      </ProviderWrapper>
    );

    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });
});
