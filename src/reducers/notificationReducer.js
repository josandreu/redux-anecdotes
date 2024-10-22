import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Initial notification';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

// Thunk para manejar notificaciones temporales
export const showNotificationWithTimeout = (message, timeout = 5000) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
