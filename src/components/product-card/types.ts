import { CSSProperties } from 'react';
import { Product } from '../../store/products-api/types';

export type ProductCardProps = {
  camera: Product;
  isActive?: boolean;
  style?: CSSProperties;
}
