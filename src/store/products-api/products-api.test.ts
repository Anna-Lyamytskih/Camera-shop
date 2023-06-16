/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import fetchMock from 'jest-fetch-mock';
import { productsApi } from './products-api';
import { BACKEND_URL } from '../../services/constatnts';
import { makeFakeProducts} from '../../utils/mocks';
import { setupApiStore } from '../../utils/mockStore';
import { Product } from './types';
import { AnyAction } from '@reduxjs/toolkit';

describe('productList', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('request is correct', () => {
    const storeRef = setupApiStore(productsApi);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch(

        productsApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${BACKEND_URL}cameras`);
      });});

  test('successful response', () => {
    const storeRef = setupApiStore(productsApi);
    const fakeProducts = makeFakeProducts();
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));

    return storeRef.store
      .dispatch(

        productsApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      )
      .then((action: { status: string; data: Product[]; isSuccess: boolean }) => {
        const { status, data, isSuccess } = action;

        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(fakeProducts);
      });});

  test('unsuccessful response', () => {
    const storeRef = setupApiStore(productsApi);
    fetchMock.mockReject(new Error('Error: Internal Server Error'));

    return storeRef.store
      .dispatch(

        productsApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      )
      .then((action: { status: string; error: string; isError: boolean }) => {
        const {status, isError} = action;

        expect(status).toBe('rejected');
        expect(isError).toBe(true);
      });});

  test('Request is correct', () => {
    const storeRef = setupApiStore(productsApi);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch(

            productsApi.endpoints.getById.initiate(1) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${BACKEND_URL}cameras/1`);
      });});
  test('Successful response', () => {
    const storeRef = setupApiStore(productsApi);
    const fakeProducts = makeFakeProducts();
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(fakeProducts));

    return storeRef.store
      .dispatch(

            productsApi.endpoints.getById.initiate(1) as unknown as AnyAction
      )
      .then((action: { status: string; data: Product[]; isSuccess: boolean }) => {
        const { status, data, isSuccess } = action;

        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(fakeProducts);
      });});

  test('Unsuccessful response', () => {
    const storeRef = setupApiStore(productsApi);
    fetchMock.mockReject(new Error('Error: Internal Server Error'));

    return storeRef.store
      .dispatch(

            productsApi.endpoints.getById.initiate(1) as unknown as AnyAction
      )
      .then((action: { status: string; error: string; isError: boolean }) => {
        const {status, isError} = action;

        expect(status).toBe('rejected');
        expect(isError).toBe(true);
      });});
});
