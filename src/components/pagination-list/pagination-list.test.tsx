import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { PaginationList } from './pagination-list';

describe('Component: PaginationList', () => {
  const fakePagination = {
    paginate:jest.fn,
    qty:1,
    currentPage:1,
    goToNext: jest.fn,
    goToPrev: jest.fn,
  };

  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <PaginationList
          pagination={fakePagination}
        />
      </ProviderWrapper>
    );

    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });
});
