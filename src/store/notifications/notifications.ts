import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../products-api/types';

export type Notification = {
  id: string;
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
  duration?: number;
}


export type NotificationsSlice = {
  notifications: Notification[];
}

const initialState: NotificationsSlice = {
  notifications: []
};

export const notificationsSlice = createSlice({
  name: NameSpace.Notification,
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = nanoid();

      state.notifications.push({ id, ...action.payload });
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((item) => item.id !== action.payload);
    }
  }
});

export const { pushNotification, clearNotification } = notificationsSlice.actions;
