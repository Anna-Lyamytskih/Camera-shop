/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import fetchMock from 'jest-fetch-mock';
import { BACKEND_URL } from '../../services/constatnts';
import { setupApiStore } from '../../utils/mockStore';
import { AnyAction } from '@reduxjs/toolkit';
import { basketDiscountApi, basketOrderApi } from './basket-api';
import { Coupon } from '../basket-process/const';

describe('basketDiscountApi', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('request is correct basketDiscountApi', () => {
    const storeRef = setupApiStore(basketDiscountApi);
    fetchMock.mockResponse(JSON.stringify({}));
    const mockReview = Coupon.First;


    return storeRef.store
      .dispatch(

        basketDiscountApi.endpoints.addItem.initiate(mockReview) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('POST');
        expect(url).toBe(`${BACKEND_URL}coupons`);
      });});
});

describe('basketOrderApi', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('request is correct basketOrderApi', () => {
    const storeRef = setupApiStore(basketOrderApi);
    fetchMock.mockResponse(JSON.stringify({}));
    const mockReview = {
      camerasIds: [1],
      coupon: Coupon.First,
    };


    return storeRef.store
      .dispatch(

        basketOrderApi.endpoints.addItem.initiate(mockReview) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('POST');
        expect(url).toBe(`${BACKEND_URL}orders`);
      });});
});
