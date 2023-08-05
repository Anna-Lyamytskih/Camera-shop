import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterProcess, NameSpace } from '../products-api/types';

export const initialState: FilterProcess = {
  filter:
  {
    maxPrice: 0,
    minPrice: 0,
    category: null,
    type: [],
    level: [],
    max:0,
    min:0
  }
};

export const filterProcessSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    changFilterMaxPrice: (state, action: PayloadAction<number>) => {
      state.filter.maxPrice = action.payload;
    },
    changFilterMinPrice: (state, action: PayloadAction<number>) => {
      state.filter.minPrice = action.payload;
    },
    changMaxPrice: (state, action: PayloadAction<number>) => {
      state.filter.max = action.payload;
    },
    changMinPrice: (state, action: PayloadAction<number>) => {
      state.filter.min = action.payload;
    },
    resetFilters: (state) => {
      state.filter.category = null;
      state.filter.type = [];
      state.filter.level = [];
      state.filter.maxPrice = 0;
      state.filter.minPrice = 0;
      state.filter.max = 0;
      state.filter.min = 0;
    },
    resetFiltersTypes: (state) => {
      state.filter.type = [];
    }
  }
});

export const {
  changFilterMinPrice,
  changFilterMaxPrice,
  resetFilters,
  changMaxPrice,
  changMinPrice,
  resetFiltersTypes
} = filterProcessSlice.actions;
