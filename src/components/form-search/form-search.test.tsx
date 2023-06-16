import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { FormSearch } from './form-search';

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <FormSearch />
      </ProviderWrapper>
    );

    expect(screen.getByText('Cannonball Pro MX 8i')).toBeInTheDocument();
  });
});
