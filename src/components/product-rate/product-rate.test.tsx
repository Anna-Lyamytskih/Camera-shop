import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { ProductRate } from './product-rate';

describe('Component: ProductRate', () => {
  const props = {
    rate:1,
    evaluation:1
  };
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <ProductRate rate={props.rate} evaluation={props.evaluation}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
