import { ProductCard } from '../product-card';
import { ProductCardListProps } from './types';

export const ProductCardList = ({cameras}:ProductCardListProps) => (
  <div className="cards catalog__cards" data-testid="test-product-card">
    {cameras.map((item) => <ProductCard camera={item} key={item.id} /> )}
  </div>
);
export default ProductCardList;
