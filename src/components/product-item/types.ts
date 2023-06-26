import { Product } from '../../store/products-api/types';

export type ProductItemProps = {
  camera: Product;
  rate: number | undefined;
  evaluation: number | undefined;
}
