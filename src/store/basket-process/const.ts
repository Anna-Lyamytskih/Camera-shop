/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Products } from '../products-api/types';

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum Coupon {
  First = 'camera-333',
  Second = 'camera-444',
  Third = 'camera-555'
}

export type BasketSlice = {
  discounts: number;
  basketProducts: Products;
  totalCount: number;
  discount: number;
  coupon: Coupon | null;
  orderStatus: Status;
};

const basketStorage = localStorage.getItem('persist-state');
const basketStorageTotalCount = localStorage.getItem('totalCount-state');
const basketStorageDiscountPercent = localStorage.getItem('discountPercent-state');

export const initialState: BasketSlice = {
  discounts: JSON.parse(basketStorageDiscountPercent as unknown as string),
  basketProducts: JSON.parse(basketStorage as unknown as string),
  totalCount: JSON.parse(basketStorageTotalCount as unknown as string),
  discount: 0,
  coupon: null,
  orderStatus: Status.Idle,
};
