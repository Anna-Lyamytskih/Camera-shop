import { render, screen } from '@testing-library/react';
import { ProductReviewSuccess } from './product-review-success';
import { ProviderWrapper } from '../../utils/test-jest';

describe('Component: ProductReviewSuccess', () => {

  it('should render correctly', () => {
    const activeModal = true;
    const setActiveModal = () => true;
    const scroll = 1;

    render(
      <ProviderWrapper>
        <ProductReviewSuccess setActiveModal={setActiveModal} activeModal={activeModal} scroll={scroll}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
