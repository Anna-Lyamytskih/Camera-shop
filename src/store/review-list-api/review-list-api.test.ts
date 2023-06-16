/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import fetchMock from 'jest-fetch-mock';
import { BACKEND_URL } from '../../services/constatnts';
import { makeFakeReviewItem, makeFakeReviewItems} from '../../utils/mocks';
import { setupApiStore } from '../../utils/mockStore';
import { AnyAction } from '@reduxjs/toolkit';
import { reviewListApi } from './review-list-api';
import { ReviewItemProps } from '../../components/review-item/types';

describe('reviewList', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('Request is correct', () => {
    const storeRef = setupApiStore(reviewListApi);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch(

        reviewListApi.endpoints.getList.initiate(1) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${BACKEND_URL}cameras/1/reviews`);
      });});

  test('Successful response', () => {
    const storeRef = setupApiStore(reviewListApi);
    const fakeReviews = makeFakeReviewItems();
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(fakeReviews));

    return storeRef.store
      .dispatch(

        reviewListApi.endpoints.getList.initiate(1) as unknown as AnyAction
      )
      .then((action: { status: string; data: ReviewItemProps; isSuccess: boolean }) => {
        const { status, data, isSuccess } = action;

        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(fakeReviews);
      });});

  test('Unsuccessful response', () => {
    const storeRef = setupApiStore(reviewListApi);
    fetchMock.mockReject(new Error('Error: Internal Server Error'));

    return storeRef.store
      .dispatch(

        reviewListApi.endpoints.getList.initiate(1) as unknown as AnyAction
      )
      .then((action: { status: string; error: string; isError: boolean }) => {
        const {status, isError} = action;

        expect(status).toBe('rejected');
        expect(isError).toBe(true);
      });});

  test('request is correct', () => {
    const storeRef = setupApiStore(reviewListApi);
    fetchMock.mockResponse(JSON.stringify({}));
    const mockReview = makeFakeReviewItem();

    return storeRef.store
      .dispatch(

        reviewListApi.endpoints.addItem.initiate(mockReview) as unknown as AnyAction
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock?.mock.calls[0][0] as Request;

        expect(method).toBe('POST');
        expect(url).toBe(`${BACKEND_URL}reviews`);
      });});
});
