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
