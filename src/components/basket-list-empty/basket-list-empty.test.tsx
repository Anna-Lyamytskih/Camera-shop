import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { BasketListEmpty } from './basket-list-empty';

describe('Component: BasketListEmpty', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <BasketListEmpty />
      </ProviderWrapper>
    );

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });
});
