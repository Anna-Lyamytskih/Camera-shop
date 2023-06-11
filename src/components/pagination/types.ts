export type PaginationProps = {
  item: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}
