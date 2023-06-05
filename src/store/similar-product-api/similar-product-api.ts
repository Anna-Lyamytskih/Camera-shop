import { baseQuery } from '../../services/api';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { APIRoute } from '../constants';
import { SimilarProducts } from './types';

export const similarProductsApi = createApi({
  reducerPath: 'similarProductsApi',
  baseQuery: baseQuery(),
  tagTypes: ['similarProductList'],
  endpoints: (builder) => ({
    getList: builder.query<SimilarProducts, number>({
      query: (id) => `${APIRoute.Product}/${id}${APIRoute.Similar}`,
      providesTags: (result) => ['similarProductList'],
    }),
  }),
});
