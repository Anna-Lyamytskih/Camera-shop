import { render, screen, fireEvent } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Tabs } from './tabs';
import { HistoryRouter } from '../history-router';
import { createMemoryHistory } from 'history';

describe('Component: Tabs', () => {
  const props = [{
    key: 'characteristic',
    name: 'Характеристики',
    component: <div>Component</div>,
  }];

  const history = createMemoryHistory();

  it('should render correctly', () => {
    history.push('/');
    render(
      <ProviderWrapper>
        <HistoryRouter history={history}>
          <Tabs tabs={props} />
        </HistoryRouter>
      </ProviderWrapper>
    );
    fireEvent.click(screen.getByText('Характеристики'));
    expect(screen.getByText('Component')).toBeInTheDocument();

  });
});
