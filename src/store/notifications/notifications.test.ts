import { makeFakeNotification } from '../../utils/mocks';
import { NotificationsSlice, clearNotification, notificationsSlice, pushNotification } from './notifications';


const notification = makeFakeNotification();

describe('Reducer: notificationsSlice', () => {
  let state: NotificationsSlice;

  beforeEach(() => {
    state = {
      notifications: []
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(notificationsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('pushNotification test', () => {
    expect(notificationsSlice.reducer(state, pushNotification(notification)))
      .toEqual({
        notifications: [notification]
      });
  });

  it('clearNotification test', () => {
    expect(notificationsSlice.reducer(state, clearNotification(notification.id)))
      .toEqual(state);
  });
});
