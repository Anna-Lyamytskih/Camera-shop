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
  rating?: number;
  count?: number | undefined;
  }

export type Products = Product[];

export enum SortingTypeBy {
  Price = 'price',
  Rate = 'rating',
  }

export type SortingProduct = Pick<Product, 'price' | 'rating'>;

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
    Filter = 'FILTER',
    Basket = 'BASKET',
    Paginate = 'PAGINATE'
  }

export enum FilterTypePrice {
  Price = 'от',
  PriceUp = 'до',
  }

export enum FilterTypeCategory {
  Photocamera = 'Фотокамера',
  Videocamera = 'Видеокамера',
  }

export enum FilterTypeTypes {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная'
  }

export enum FilterTypeLevel {
    Zero = 'Нулевой',
    NonProfessional = 'Любительский',
    Professional = 'Профессиональный'
  }

export type FilterProcess = {
  filter:
{
  maxPrice: number;
  minPrice: number;
  category:FilterTypeCategory | null;
  type:FilterTypeTypes[];
  level:FilterTypeLevel[];
  max: number;
  min: number;
};
}

export enum FilterPrices {
  Min = 'min',
  Max = 'max',
}
