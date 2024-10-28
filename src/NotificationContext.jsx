/*
Contexto para el reducer notificationReducerUseReducer
*/

import { createContext, useReducer, useRef } from 'react';
import {
  clearNotification,
  notificationReducer,
  setNotification,
} from './reducers/notificationReducerUseReducer';

import PropTypes from 'prop-types';

const initialState = {
  message: '',
  className: '',
  isVisible: false,
};

// Creamos el contexto
export const NotificationContext = createContext();

// Proveedor del contexto
export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  const timeoutIdRef = useRef(null); // Referencia para manejar el temporizador

  const showNotification = (message, className) => {
    // Limpiar el temporizador anterior si existe
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    dispatch(setNotification(message, className));

    // Configurar un nuevo temporizador para ocultar la notificación después de 5 segundos
    timeoutIdRef.current = setTimeout(() => {
      dispatch(clearNotification());
      timeoutIdRef.current = null; // Resetear el temporizador
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
