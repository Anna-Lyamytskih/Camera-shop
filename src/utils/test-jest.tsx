import { configureMockStore } from '@jedmao/redux-mock-store';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '../store/store-process/store-process';
import MockAdapter from 'axios-mock-adapter';
import { DeepPartial} from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../services/api';

export type RootState = ReturnType<typeof store.getState>
const stores = configureMockStore<RootState>()({});
const mockStore = configureMockStore<RootState>()({});

export type TestWrapperProps = {
  children: ReactNode;
  fakeStore?: typeof mockStore;
}

export const ProviderWrapper = ({ children, fakeStore}: TestWrapperProps) => (
  <Provider store={fakeStore || stores}>
    <ToastContainer />
    <HelmetProvider>
      {children}
    </HelmetProvider>
  </Provider>
);

export const createMockStoreWithAPI = (fakeState: DeepPartial<RootState>) => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action<string>>
  >(middlewares)(fakeState);

  return { fakeStore, mockAPI };
};
