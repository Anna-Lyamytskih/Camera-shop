import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { NavigationList } from './navigation-list';
import { navigationItems } from './constants';

describe('Component: NavigationList', () => {

  it('should render correctly', () => {

    render(
      <ProviderWrapper>
        <NavigationList items={navigationItems} />
      </ProviderWrapper>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
