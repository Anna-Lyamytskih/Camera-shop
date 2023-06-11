export type Product= {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Коллекционная' | 'Моментальная'|'Цифровая'|'Плёночная';
  category: 'Видеокамера'|'Фотоаппарат';
  description: string;
  level: 'Нулевой'|'Любительский'|'Профессиональный';
  price: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  }

export type Products = Product[];

export type ProductItemType = {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Коллекционная'|'Моментальная'|'Цифровая'|'Плёночная';
  category: 'Видеокамера'|'Фотоаппарат';
  description: string;
  level: 'Нулевой' | 'Любительский' | 'Профессиональный';
  price: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  }

export enum SortingTypeBy {
  Price = 'price',
  Rate = 'reviewCount',
  }

export type SortingProduct = Pick<Product, 'price' | 'reviewCount'>;

export type SortingProductKey = keyof SortingProduct;

export enum SortingTypeOrder {
    Up = 'up',
    Down = 'down',
  }

export type ProductProcess = {
    filter: {
      by: SortingProductKey | null;
      order: SortingTypeOrder | null;
    };
  }

export const initialState: ProductProcess = {
  filter: {
    by: null,
    order: null,
  },
};

export enum NameSpace {
    ProductItem = 'PRODUCT',
  }
