import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Pagination } from './pagination';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';

describe('Component: Pagination', () => {

  const fakePagination = {
    item: 1,
    currentPages: 1,
  };

  const history = createMemoryHistory();

  it('should render correctly', () => {
    history.push('/');
    render(
      <ProviderWrapper>
        <HistoryRouter history={history}>
          <Pagination item={fakePagination.item} currentPages={fakePagination.currentPages} />
        </HistoryRouter>
      </ProviderWrapper>
    );

    expect(screen.getByText(`${1}`)).toBeInTheDocument();
  });
});
