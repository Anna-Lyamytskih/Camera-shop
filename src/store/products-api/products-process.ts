import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from './types';

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

const initialState: ProductProcess = {
  filter: {
    by: null,
    order: null,
  },
};

export enum NameSpace {
  ProductItem = 'PRODUCT',
}

export const productProcessSlice = createSlice({
  name: NameSpace.ProductItem,
  initialState,
  reducers: {
    changeSortBy: (state, action: PayloadAction<SortingTypeBy>) => {
      state.filter.by = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<SortingTypeOrder>) => {
      state.filter.order = action.payload;
    },
  }
});

export const { changeSortBy, changeSortOrder } = productProcessSlice.actions;
