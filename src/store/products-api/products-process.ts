import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortingTypeBy, SortingTypeOrder, initialState } from './types';

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
