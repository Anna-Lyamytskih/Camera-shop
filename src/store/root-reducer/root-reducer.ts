import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../products-api/products-api';
import { productProcessSlice } from '../products-api/products-process';
import { promoApi } from '../promo-api/promo-api';
import { similarProductsApi } from '../similar-product-api/similar-product-api';
import { reviewListApi } from '../review-list-api/review-list-api';
import { filterProcessSlice } from '../filter-process/filter-process';

export const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [promoApi.reducerPath]: promoApi.reducer,
  [productProcessSlice.name]: productProcessSlice.reducer,
  [filterProcessSlice.name]: filterProcessSlice.reducer,
  [similarProductsApi.reducerPath]: similarProductsApi.reducer,
  [reviewListApi.reducerPath]: reviewListApi.reducer
});
