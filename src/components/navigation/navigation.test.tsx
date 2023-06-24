import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Navigation } from './navigation';
import { AppRoute } from '../../router/constants';

const fakeNavigation = {
  url:AppRoute.Root,
  title:'fake'
};
describe('Component: Navigation', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Navigation path={fakeNavigation.url} name={fakeNavigation.title}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('fake')).toBeInTheDocument();
  });
});
