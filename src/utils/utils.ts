import { Product, Products, SortingProductKey, SortingTypeOrder } from '../store/products-api/types';
import { Reviews } from '../store/review-list-api/type';

export const getSortingOrder = (
  products: Products | undefined,
  sortOrder: SortingTypeOrder | null,
  sortBy: SortingProductKey | null,
) => {
  const sortingProducts = (products || []).slice();

  if(sortBy === null) {
    return sortingProducts;
  }

  switch (sortOrder) {
    case SortingTypeOrder.Up: return sortingProducts.sort(
      (a: Product, b: Product) => a[sortBy] - b[sortBy]
    );
    case SortingTypeOrder.Down: return sortingProducts.sort(
      (a: Product, b: Product) => b[sortBy] - a[sortBy]
    );
    default:
      return sortingProducts;
  }
};

export const getReviewList = (review: Reviews) => {
  const items = [...review];

  items.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  return items;
};
