import { Products } from '../../store/products-api/types';
import ProductCard from '../product-card';

type ProductCardListProps = {
  cameras: Products | undefined;
}

const ProductCardList = ({cameras}:ProductCardListProps) => (
  <div className="cards catalog__cards">
    {cameras?.map((item) => <ProductCard camera={item} key={item.id} /> )}
  </div>
);
export default ProductCardList;
