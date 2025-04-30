import { configureStore } from '@reduxjs/toolkit';
import { newsReducer, commentReducer } from './slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchNews } from './action';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comment: commentReducer,
  },
});

store.dispatch(fetchNews());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
