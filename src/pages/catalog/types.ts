export type UsePagination = {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  qty: number;
  limit: number;
}

export type QueryParam = {
  sortBy?: string;
  order?: string;
  category?: string;
  type?: string[];
  level?: string[];
  price_gte?: string;
  price_lte?: string;
};
