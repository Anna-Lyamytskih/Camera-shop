export type UsePagination = {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  qty: number;
}

export type PaginationListProps = {
  pagination: UsePagination;
}
