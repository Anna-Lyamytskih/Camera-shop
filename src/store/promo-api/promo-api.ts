import { baseQuery } from '../../services/api';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { APIRoute } from '../constants';
import { PromoType } from './types';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: baseQuery(),
  tagTypes: ['PromoItem'],
  endpoints: (builder) => ({
    getList: builder.query<PromoType, void>({
      query: () => `${APIRoute.Promo}`,
      providesTags: (result) => ['PromoItem'],
    }),
  })
});
