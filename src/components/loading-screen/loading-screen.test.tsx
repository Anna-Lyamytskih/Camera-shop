import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { LoadingScreen } from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <LoadingScreen />
      </ProviderWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
