/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { APIRoute } from '../constants';
import { Coupon } from '../basket-process/const';
import { baseQuery } from '../../services/api';

export const basketDiscountApi = createApi({
  reducerPath: 'basketApi',
  baseQuery: baseQuery(),
  tagTypes: ['basketApi'],
  endpoints: (builder) => ({
    addItem: builder.mutation<{data:number}, Coupon>({
      query: (data) => ({
        url: `${APIRoute.Coupon}`,
        method: 'POST',
        body: {coupon: data},
      }),
      invalidatesTags: ['basketApi']
    }),
  }),
});

export type Basket = {
    camerasIds: number[];
    coupon: Coupon | null;
}
export const basketOrderApi = createApi({
  reducerPath: 'basketOrderApi',
  baseQuery: baseQuery(),
  tagTypes: ['basketOrderApi'],
  endpoints: (builder) => ({
    getList: builder.query<Basket, void>({
      query: () => `${APIRoute.Order}`,
      providesTags: ['basketOrderApi'],
    }),
    addItem: builder.mutation<number, Basket>({
      query: ({camerasIds, coupon}) => ({
        url: `${APIRoute.Order}`,
        method: 'POST',
        body: {
          camerasIds:camerasIds,
          coupon:coupon
        }
      }),
      invalidatesTags: ['basketOrderApi'],
    }),
  }),
});
