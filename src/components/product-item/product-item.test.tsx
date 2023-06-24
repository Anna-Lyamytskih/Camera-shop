import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { makeFakerProduct } from '../../utils/mocks';
import { ProductItem } from './product-item';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';

describe('Component: ProductItem', () => {
  const camera = makeFakerProduct();
  const history = createMemoryHistory();
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProviderWrapper>
          <ProductItem camera={camera}/>
        </ProviderWrapper>
      </HistoryRouter>
    );

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
  });
});
