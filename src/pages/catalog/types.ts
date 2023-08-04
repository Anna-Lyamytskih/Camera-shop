export type UsePagination = {
  currentPages: number;
  pagesCount: number;
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
