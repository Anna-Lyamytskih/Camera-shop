import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Navigation } from './navigation';

const fakeNavigation = {
  url:'/',
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
