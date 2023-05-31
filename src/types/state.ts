import { store } from '../store/store-process/store-process';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
