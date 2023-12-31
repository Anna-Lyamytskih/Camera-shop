import { FilterTypeCategory, FilterTypeLevel, FilterTypeType, Product, Products, SortingProductKey, SortingTypeOrder } from '../store/products-api/types';
import { Reviews } from '../store/review-list-api/type';

export const getSortingOrder = (
  products: Products | undefined,
  sortOrder: SortingTypeOrder | undefined,
  sortBy: SortingProductKey | null,
) => {
  const sortingProducts = (products || []).slice();

  if (sortBy === null) {
    return sortingProducts;
  }

  switch (sortOrder) {
    case SortingTypeOrder.Up: return sortingProducts.sort(
      (a: Product, b: Product) => (a[sortBy] || 0) - (b[sortBy] || 0)
    );
    case SortingTypeOrder.Down: return sortingProducts.sort(
      (a: Product, b: Product) => (b[sortBy] || 0) - (a[sortBy] || 0)
    );
    default:
      return sortingProducts;
  }
};

export const getFilterProducts = (
  products: Products | undefined,
  filterCategory: FilterTypeCategory | undefined,
  filterLevel: FilterTypeLevel[] | undefined,
  filterType: FilterTypeType[] | undefined,
  filterMinPrice: string | undefined,
  filterMaxPrice: string | undefined,
) =>{
  const filterProducts = products?.slice() as Products;

  const productCategoryFilter = (product:Products, category:FilterTypeCategory | undefined) => {
    if(!category) {
      return product;
    }

    const isCategoryProduct = (item:Product) => item.category === category;

    return product.filter(isCategoryProduct);
  };

  const productLevelsFilter = (product:Products, level:FilterTypeLevel[] | undefined) => {
    if(!level?.length) {
      return product;
    }

    const isLevelProduct = (item:Product) => level.includes(item.level as FilterTypeLevel);

    return product.filter(isLevelProduct);
  };

  const productTypesFilter = (product:Products, type:FilterTypeType[] | undefined) => {
    if(!type?.length) {
      return product;
    }

    const isTypesFilter = (item:Product) => type.includes(item.type as FilterTypeType);

    return product.filter(isTypesFilter);
  };

  const productPriceFilter = (product:Products, minPrice:string | undefined, maxPrice:string | undefined) => {
    if (!minPrice && !maxPrice) {
      return product;
    }

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;

    const isPriceFilter = (item:Product) => item.price >= min && item.price <= max;

    return product.filter(isPriceFilter);
  };

  const filteredProductsByCategory = productCategoryFilter(filterProducts, filterCategory);
  const filteredProductsByTypes = productTypesFilter(filteredProductsByCategory, filterType);
  const filteredCamerasByLevels = productLevelsFilter(filteredProductsByTypes, filterLevel);
  const filteredCamerasByPrice = productPriceFilter(filteredCamerasByLevels, filterMinPrice, filterMaxPrice);

  return filteredCamerasByPrice;
};

export const getReviewList = (review: Reviews) => {
  const items = [...review];

  items.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  return items;
};

export const getRate = (reviews: Reviews | undefined) => {
  if (!reviews) {
    return;
  }
  const sumRate = reviews.reduce((acc, review) => acc + review.rating, 0);

  return Math.ceil(sumRate / reviews.length);
};

export const getPriceValidation = (products:Products | undefined) => {
  if (!products?.length) {
    return {min: 0, max: 0};
  }

  const items = [...products];
  const sortedPriceProducts = items.sort((a, b) => a.price - b.price);

  const min = sortedPriceProducts[0].price;
  const max = sortedPriceProducts[sortedPriceProducts.length - 1].price;

  return {min, max};
};

export const getFilterProductsForPrice = (
  products: Products | undefined,
  filterCategory: FilterTypeCategory | undefined,
  filterLevel: FilterTypeLevel[] | undefined,
  filterType: FilterTypeType[] | undefined,
) =>{
  const filterProducts = products?.slice() as Products;
  if(!filterProducts){
    return;
  }
  const productCategoryFilter = (product:Products, category:FilterTypeCategory | undefined) => {
    if(!category) {
      return product;
    }

    const isCategoryProduct = (item:Product) => item.category === category;

    return product.filter(isCategoryProduct);
  };

  const productLevelsFilter = (product:Products, level:FilterTypeLevel[] | undefined) => {
    if(!level?.length) {
      return product;
    }

    const isLevelProduct = (item:Product) => level.includes(item.level as FilterTypeLevel);

    return product.filter(isLevelProduct);
  };

  const productTypesFilter = (product:Products, type:FilterTypeType[] | undefined) => {
    if(!type?.length) {
      return product;
    }

    const isTypesFilter = (item:Product) => type.includes(item.type as FilterTypeType);

    return product.filter(isTypesFilter);
  };

  const filteredProductsByCategory = productCategoryFilter(filterProducts, filterCategory);
  const filteredProductsByTypes = productTypesFilter(filteredProductsByCategory, filterType);
  const filteredCamerasByLevels = productLevelsFilter(filteredProductsByTypes, filterLevel);

  return filteredCamerasByLevels;
};
