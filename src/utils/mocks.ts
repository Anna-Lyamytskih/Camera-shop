import faker from 'faker';
import { Product} from '../store/products-api/types';
import { PromoType } from '../store/promo-api/types';
import { Review } from '../store/review-list-api/type';

const mockTypes = [
  'Коллекционная',
  'Моментальная',
  'Цифровая',
  'Плёночная'
];

const mockCategorys = [
  'Видеокамера',
  'Фотоаппарат'
];

const mockLevels = [
  'Нулевой',
  'Любительский',
  'Профессиональный'
];

const getRandomArrayElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const randomItemType = getRandomArrayElement(mockTypes) as Product['type'];
const randomItemCategory = getRandomArrayElement(mockCategorys) as Product['category'];
const randomItemCLevel = getRandomArrayElement(mockLevels) as Product['level'];

export const makeFakerProduct = ():Product => ({
  id: faker.datatype.number(),
  name: faker.internet.userName(),
  vendorCode: faker.datatype.string(),
  type: randomItemType,
  category: randomItemCategory,
  description: faker.commerce.productDescription(),
  level: randomItemCLevel,
  price: faker.datatype.number(),
  reviewCount: faker.datatype.number(),
  previewImg: faker.internet.avatar(),
  previewImg2x: faker.internet.avatar(),
  previewImgWebp: faker.internet.avatar(),
  previewImgWebp2x: faker.internet.avatar(),
});

export const makeFakeProducts = (): Product[] =>
  Array.from({ length: 10 }, makeFakerProduct);

export const makeFakePromo = ():PromoType => ({
  id: faker.datatype.number(),
  name: faker.internet.userName(),
  previewImg: faker.internet.avatar(),
  previewImg2x: faker.internet.avatar(),
  previewImgWebp: faker.internet.avatar(),
  previewImgWebp2x: faker.internet.avatar(),
});

export const makeFakeReviewItem = ():Review => ({
  id: String(faker.datatype.number()),
  createAt: faker.date.month(),
  cameraId: faker.datatype.number(),
  userName: faker.internet.userName(),
  advantage: faker.commerce.productDescription(),
  disadvantage: faker.commerce.productDescription(),
  review: faker.commerce.productDescription(),
  rating: faker.datatype.number(),
});

export const makeFakeReviewItems = (): Review[] =>
  Array.from({ length: 10 }, makeFakeReviewItem);
