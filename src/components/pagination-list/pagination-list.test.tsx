import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { PaginationList } from './pagination-list';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';

describe('Component: PaginationList', () => {
  const fakePagination = {
    paginate:jest.fn,
    pagesCount:1,
    currentPages:1,
  };

  const history = createMemoryHistory();

  it('should render correctly', () => {
    history.push('/');
    render(
      <ProviderWrapper>
        <HistoryRouter history={history}>
          <PaginationList
            pagination={fakePagination}
          />
        </HistoryRouter>
      </ProviderWrapper>
    );

    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });
});
