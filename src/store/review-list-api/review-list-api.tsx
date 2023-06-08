import { baseQuery } from '../../services/api';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { APIRoute } from '../constants';
import { Reviews } from './type';

type ProductReviewFormType = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export const reviewListApi = createApi({
  reducerPath: 'reviewListApi',
  baseQuery: baseQuery(),
  tagTypes: ['reviewList'],
  endpoints: (builder) => ({
    getList: builder.query<Reviews, number>({
      query: (id) => `${APIRoute.Product}/${id}${APIRoute.Review}`,
      providesTags: (result) => ['reviewList'],
    }),
    addItem: builder.mutation<Reviews, ProductReviewFormType>({
      query: ({ ...body }) => ({
        url: `${APIRoute.Review}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['reviewList'],
    }),
  }),
});
