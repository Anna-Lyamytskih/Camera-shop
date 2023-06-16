import { render, screen, fireEvent } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Tabs } from './tabs';

describe('Component: Tabs', () => {
  const props = [{
    key: 'characteristic',
    name: 'Характеристики',
    component: <div>Component</div>,
  }];

  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Tabs tabs={props} />
      </ProviderWrapper>
    );
    fireEvent.click(screen.getByText('Характеристики'));
    expect(screen.getByText('Component')).toBeInTheDocument();

  });
});
