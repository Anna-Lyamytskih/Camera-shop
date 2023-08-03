import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Product } from '../products-api/types';
import { Coupon, initialState, Status} from './const';

export const basketProcessSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const productFind = state.basketProducts?.find((item) => item.id === action.payload.id);

      if (productFind && productFind.count) {
        productFind.count++;
        state.totalCount++;
      } else {
        state.basketProducts?.push({ ...action.payload, count: 1 });
        state.totalCount++;
      }
    },
    decrementProductCount: (state, action: PayloadAction<Product>) => {
      const productFind = state.basketProducts?.find((item) => item.id === action.payload.id);

      if (productFind && productFind.count) {
        productFind.count--;
        state.totalCount--;
      }
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.basketProducts = state.basketProducts?.filter((item) => item.id !== action.payload.id);
      state.totalCount = state.basketProducts?.reduce((acc, item) => acc + (item.count as number), 0);
    },
    setProductCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const productFind = state.basketProducts?.find((item) => item.id === action.payload.id);

      if (productFind) {
        productFind.count = action.payload.count;
        state.totalCount = state.basketProducts?.reduce((acc, item) => acc + (item.count as number), 0);
      }
    },
    setCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discounts = action.payload;
    },
    reset: (state) => {
      state.basketProducts = [];
      state.totalCount = 0;
      state.discounts = 0;
      state.coupon = null;
    },
    orderStatus: (state, action: PayloadAction<Status>) => {
      state.orderStatus = action.payload;
    },
    resetOrderStatus: (state) => {
      state.orderStatus = Status.Idle;
    }
  }});

export const {
  addProduct,
  decrementProductCount,
  removeProduct,
  setProductCount,
  setCoupon,
  setDiscount,
  reset,
  orderStatus,
  resetOrderStatus
} = basketProcessSlice.actions;
