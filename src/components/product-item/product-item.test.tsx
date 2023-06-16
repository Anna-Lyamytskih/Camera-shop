import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { makeFakerProduct } from '../../utils/mocks';
import { ProductItem } from './product-item';

describe('Component: ProductItem', () => {
  const camera = makeFakerProduct();
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <ProductItem camera={camera}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
  });
});
