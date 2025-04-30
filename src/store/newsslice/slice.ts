import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsItem } from '../../types/news';
import { fetchNews, fetchNewsDetail } from './action';
import { newsInitialState } from './initialState';

const newsSlice = createSlice({
  name: 'news',
  initialState: newsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<NewsItem[]>) => {
          state.news = action.payload;
          state.loading = false;
          state.reload = false;
        },
      )
      .addCase(fetchNews.pending, (state) => {
        if (!state.news) {
          state.loading = true;
        } else {
          state.reload = true;
        }
      })
      .addCase(fetchNews.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(
        fetchNewsDetail.fulfilled,
        (state, action: PayloadAction<NewsItem>) => {
          state.newsDetail = action.payload;
          state.loadingDetail = false;
        },
      )
      .addCase(fetchNewsDetail.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(fetchNewsDetail.rejected, (state) => {
        state.error = true;
      });
  },
});

export const newsReducer = newsSlice.reducer;
