import { render, screen } from '@testing-library/react';
import { ReviewList } from './review-list';
import { HistoryRouter } from '../../components/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { setupApiStore } from '../../utils/mockStore';
import { AnyAction } from '@reduxjs/toolkit';
import { makeFakeProducts} from '../../utils/mocks';
import fetchMock from 'jest-fetch-mock';
import { createMemoryHistory } from 'history';
import { reviewListApi } from '../../store/review-list-api/review-list-api';

describe('Component: ReviewList', () => {
  const history = createMemoryHistory();
  const fakeProducts = makeFakeProducts();
  fetchMock.mockResponse(JSON.stringify(fakeProducts));
  const storeRef = setupApiStore(reviewListApi);
  storeRef.store
    .dispatch(
      reviewListApi.endpoints.getList.initiate(1) as unknown as AnyAction
    );
  const props = {
    cameraId: 1,
  };
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={storeRef.store}>
          <HelmetProvider>
            <ReviewList cameraId={props.cameraId}/>
          </HelmetProvider>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });
});

