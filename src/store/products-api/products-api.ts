import { baseQuery } from '../../services/api';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { APIRoute } from '../constants';
import { ProductItemType, Products } from './types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQuery(),
  tagTypes: ['CameraList','CameraItem'],
  endpoints: (builder) => ({
    getList: builder.query<Products, void>({
      query: () => `${APIRoute.Product}`,
      providesTags: (result) => ['CameraList'],
    }),
    getById: builder.query<ProductItemType, number>({
      query: (id) => `${APIRoute.Product}/${id}`,
      providesTags: ['CameraItem'],
    }),
  }),
});
