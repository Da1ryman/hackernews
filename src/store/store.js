import { configureStore } from "@reduxjs/toolkit";
import { newsReducer, commentReducer } from "./slice";

export default configureStore({
  reducer: {
    news: newsReducer,
    comment: commentReducer,
  },
});
