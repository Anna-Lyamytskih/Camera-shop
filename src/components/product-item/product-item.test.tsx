import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { makeFakerProduct } from '../../utils/mocks';
import { ProductItem } from './product-item';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';

describe('Component: ProductItem', () => {
  const camera = makeFakerProduct();
  const history = createMemoryHistory();
  const props = {
    rate:2,
    evaluation:2
  };
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProviderWrapper>
          <ProductItem camera={camera} rate={props.rate} evaluation={props.evaluation}/>
        </ProviderWrapper>
      </HistoryRouter>
    );

    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
