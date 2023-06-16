import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { ProductSlider } from './product-slider';

describe('Component: ProductSlider', () => {

  const props = {
    slides: [],
  };
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <ProductSlider slides={props.slides}/>
      </ProviderWrapper>
    );

    expect(screen.getByLabelText('Следующий слайд')).toBeInTheDocument();
  });
});
