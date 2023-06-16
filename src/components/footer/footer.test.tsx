import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Footer } from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Footer />
      </ProviderWrapper>
    );

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
  });
});
