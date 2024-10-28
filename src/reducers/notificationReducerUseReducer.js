/*
Reducer para el manejo del estado de notificaciones, para usarlo con useReducer y Context

Las funciones se utilizan en el archivo NotificationContext.jsx
*/

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.payload.message,
        className: action.payload.className,
        isVisible: true,
      };
    case 'HIDE_NOTIFICATION':
      return { ...state, isVisible: false, message: '', className: '' };
    default:
      return state;
  }
};

// Action creators
export const setNotification = (message, className) => ({
  type: 'SHOW_NOTIFICATION',
  payload: { message, className },
});

export const clearNotification = () => ({
  type: 'HIDE_NOTIFICATION',
});
