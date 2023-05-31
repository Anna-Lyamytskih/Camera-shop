import { SortingProductKey, SortingTypeOrder } from '../store/products-api/products-process';
import { Product, Products } from '../store/products-api/types';

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

