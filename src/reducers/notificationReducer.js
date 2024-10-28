/*
Reducer Redux para el manejo del estado de las notificaciones, uso con useSelector

No lo usamos, se ha reemplazado por useReducer. Lo dejamos a modo de ejemplo
*/

import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Initial notification';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(state, { payload }) {
      return payload;
    },
    clearNotification() {
      return '';
    },
  },
});

// Thunk para manejar notificaciones temporales
export const showNotificationWithTimeout = (
  message,
  className,
  timeout = 5000
) => {
  return (dispatch) => {
    dispatch(setNotification({ message: message, className: className }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
