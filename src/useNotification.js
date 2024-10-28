/*
Archivo usado únicamente para crear el hook personalizado para usar el contexto useContext(NotificationContext)
*/

import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

// Hook para usar el contexto
export const useNotification = () => {
  return useContext(NotificationContext);
};
