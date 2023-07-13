import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterProcess, FilterTypeCategory, FilterTypeLevel, FilterTypeTypes, NameSpace} from '../products-api/types';

export const initialState:FilterProcess = {
  filter:
{
  maxPrice: 0,
  minPrice:0,
  category:null,
  type:[],
  level:[]
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
    changFilterCategory: (state, action: PayloadAction<FilterTypeCategory | null>) => {
      state.filter.category = action.payload;
    },
    changFilterLevel: (state, action: PayloadAction<FilterTypeLevel>) => {
      if (state.filter.level.includes(action.payload)) {state.filter.level = state.filter.level.filter((level) => level !== action.payload);

        return;
      }

      state.filter.level.push(action.payload);
    },
    changFilterLTypes: (state, action: PayloadAction<FilterTypeTypes>) => {
      if (state.filter.type.includes(action.payload)) {
        state.filter.type = state.filter.type.filter((type) => type !== action.payload);

        return;
      }
      state.filter.type.push(action.payload);
    },
    resetFilters: (state) => {
      state.filter.category = null;
      state.filter.type = [];
      state.filter.level = [];
      state.filter.maxPrice = 0;
      state.filter.minPrice = 0;
    }
  }
});

export const {changFilterMinPrice, changFilterMaxPrice, changFilterCategory, changFilterLevel, changFilterLTypes, resetFilters } = filterProcessSlice.actions;
