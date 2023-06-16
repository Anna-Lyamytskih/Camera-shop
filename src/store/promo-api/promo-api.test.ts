/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import fetchMock from 'jest-fetch-mock';
import { BACKEND_URL } from '../../services/constatnts';
import { makeFakePromo} from '../../utils/mocks';
import { setupApiStore } from '../../utils/mockStore';
import { AnyAction } from '@reduxjs/toolkit';
import { promoApi } from './promo-api';
import { PromoType } from './types';

describe('promoList', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('request is correct', () => {
    const storeRef = setupApiStore(promoApi);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch(

        promoApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${BACKEND_URL}promo`);
      });});

  test('successful response', () => {
    const storeRef = setupApiStore(promoApi);
    const fakePromo = makeFakePromo();
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(fakePromo));

    return storeRef.store
      .dispatch(

        promoApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      )
      .then((action: { status: string; data: PromoType; isSuccess: boolean }) => {
        const { status, data, isSuccess } = action;

        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(fakePromo);
      });});

  test('unsuccessful response', () => {
    const storeRef = setupApiStore(promoApi);
    fetchMock.mockReject(new Error('Error: Internal Server Error'));

    return storeRef.store
      .dispatch(

        promoApi.endpoints.getList.initiate(undefined) as unknown as AnyAction
      )
      .then((action: { status: string; error: string; isError: boolean }) => {
        const {status, isError} = action;

        expect(status).toBe('rejected');
        expect(isError).toBe(true);
      });});
});
