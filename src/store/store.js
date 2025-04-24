import { configureStore } from "@reduxjs/toolkit";
import { newsReducer, commentReducer, fetchNews } from "./slice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comment: commentReducer,
  },
});

store.dispatch(fetchNews());
