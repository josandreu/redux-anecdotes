/*

// Parte de código para usar este componente con el reducer notificationReducer de Redux
// Lo cambiamos para su uso con useReducer

import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector(({ notification }) => notification);

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 12,
  };

  return <div style={style}>{notifications.message}</div>;
};

*/

import { useNotification } from '../useNotification';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification.isVisible) {
    return null; // No mostrar nada si no está visible
  }

  let style = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
  };

  if (notification.className === 'error') {
    style = {
      ...style,
      color: 'red',
    };
  }

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
