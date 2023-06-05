import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import { rootReducer } from '../root-reducer/root-reducer';
import { productsApi } from '../products-api/products-api';
import { promoApi } from '../promo-api/promo-api';
import { similarProductsApi } from '../similar-product-api/similar-product-api';
import { reviewListApi } from '../review-list-api/review-list-api';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(productsApi.middleware).concat(promoApi.middleware).concat(similarProductsApi.middleware).concat(reviewListApi.middleware)
});
