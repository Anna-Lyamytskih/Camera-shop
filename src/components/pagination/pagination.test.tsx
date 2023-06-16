import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { Pagination } from './pagination';

describe('Component: Pagination', () => {

  const fakePagination = {
    item: 1,
    paginate: jest.fn,
    currentPage: 1,
  };

  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Pagination item={fakePagination.item} paginate={fakePagination.paginate} currentPage={fakePagination.currentPage} />
      </ProviderWrapper>
    );

    expect(screen.getByText(`${1}`)).toBeInTheDocument();
  });
});
