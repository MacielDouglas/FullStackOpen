import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';
import notificationReducer from './notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifications: notificationReducer,
  },
});

export default store;
