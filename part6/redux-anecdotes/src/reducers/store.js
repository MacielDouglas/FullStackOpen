import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer, { setAnecdotes } from './anecdoteReducer';
import filterReducer from './filterReducer';
import notificationReducer from './notificationReducer';

import anecdotesService from '../services/anecdotes';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifications: notificationReducer,
  },
});

anecdotesService
  .getAll()
  .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));

export default store;
