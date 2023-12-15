import React, { createContext, useContext, useReducer } from 'react';

// Tipos de Ação
const VOTE = 'VOTE';
const CREATE = 'CREATE';
const TIMEOUT = 'TIMEOUT';
const ERROR = 'ERROR';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case VOTE:
      return `anedota '${action.payload}' voted`;

    case CREATE:
      return `anedota '${action.payload}' created`;

    case TIMEOUT:
      return null;

    case ERROR:
      return action.payload;

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useValueNotification = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, notificationDispatch] = useContext(NotificationContext);
  return notificationDispatch;
};

export default NotificationContext;
