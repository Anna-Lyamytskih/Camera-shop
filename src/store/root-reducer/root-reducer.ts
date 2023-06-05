import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../products-api/products-api';
import { productProcessSlice } from '../products-api/products-process';
import { promoApi } from '../promo-api/promo-api';
import { similarProductsApi } from '../similar-product-api/similar-product-api';
import { reviewListApi } from '../review-list-api/review-list-api';

export const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [promoApi.reducerPath]: promoApi.reducer,
  [productProcessSlice.name]: productProcessSlice.reducer,
  [similarProductsApi.reducerPath]: similarProductsApi.reducer,
  [reviewListApi.reducerPath]: reviewListApi.reducer
});
