import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { NavigationList } from './navigation-list';
import { AppRoute } from '../../router/constants';

describe('Component: NavigationList', () => {

  it('should render correctly', () => {
    const navigationItems = [
      {
        url:AppRoute.Root,
        title:'Каталог'
      },
    ];

    render(
      <ProviderWrapper>
        <NavigationList navigationItems={navigationItems}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
