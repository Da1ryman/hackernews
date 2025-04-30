import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './newsslice/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchNews } from './newsslice/action';
import { commentReducer } from './commentslice/slice';

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
