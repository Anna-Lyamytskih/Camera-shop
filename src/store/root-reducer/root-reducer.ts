import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../products-api/products-api';
import { productProcessSlice } from '../products-api/products-process';
import { promoApi } from '../promo-api/promo-api';
import { similarProductsApi } from '../similar-product-api/similar-product-api';
import { reviewListApi } from '../review-list-api/review-list-api';
import { basketProcessSlice } from '../basket-process/basket-process';
import { basketDiscountApi, basketOrderApi } from '../basket-api/basket-api';

export const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [promoApi.reducerPath]: promoApi.reducer,
  [productProcessSlice.name]: productProcessSlice.reducer,
  [similarProductsApi.reducerPath]: similarProductsApi.reducer,
  [reviewListApi.reducerPath]: reviewListApi.reducer,
  [basketProcessSlice.name]: basketProcessSlice.reducer,
  [basketDiscountApi.reducerPath]: basketDiscountApi.reducer,
  [basketOrderApi.reducerPath]: basketOrderApi.reducer,
});
