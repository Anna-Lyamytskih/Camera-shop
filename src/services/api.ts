import axios, { AxiosInstance } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from './constatnts';
import { FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { toast } from 'react-toastify';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};

export const baseQuery = () => {
  const baseQueryFn = fetchBaseQuery({
    baseUrl: BACKEND_URL,
  });
  const baseQueryRes = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
  ) => {
    const { error, data } = await baseQueryFn(args, api, extraOptions);
    const typedError = error as {
      status?: number;
      data?: { message?: string };
    };
    if (error) {
      toast(typedError.data?.message || typedError.status || 'unknown error');
      return { error: { status: error.status, data: error.data } };
    }
    const typedData = data as { message?: string };
    if (typedData?.message) {
      toast.info(typedData?.message);
      delete typedData.message;
    }
    return { data };
  };
  return baseQueryRes as unknown as BaseQueryFn;
};
