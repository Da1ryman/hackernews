import { configureStore } from "@reduxjs/toolkit";
import { newsReducer, commentReducer, fetchNews } from "./slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comment: commentReducer,
  },
});

store.dispatch(fetchNews());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();