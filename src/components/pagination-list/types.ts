export type UsePagination = {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  pagesCount: number;
}

export type PaginationListProps = {
  pagination: UsePagination;
}
