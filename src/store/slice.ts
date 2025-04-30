import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentState, commentsTree } from '../types/comment';
import { NewsItem } from '../types/news';
import {
  fetchComment,
  fetchCommentTree,
  fetchNews,
  fetchNewsDetail,
} from './action';
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

const commentInitialState: CommentState = {
  comments: [],
  commentsTree: [],
  loading: true,
  error: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: commentInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchComment.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          if (action.payload) {
            state.comments = action.payload;
            state.loading = false;
          }
        },
      )
      .addCase(fetchComment.pending, (state) => {
        if (!state.comments) {
          state.loading = true;
        }
      })
      .addCase(fetchComment.rejected, (state) => {
        state.error = true;
      })
      .addCase(
        fetchCommentTree.fulfilled,
        (state, action: PayloadAction<commentsTree>) => {
          const { parent, comments } = action.payload;
          state.commentsTree = state.commentsTree.filter(
            (tree) => tree.parent !== parent,
          );
          if (comments.length > 0) {
            state.commentsTree.push({ parent, comments });
          }
        },
      );
  },
  reducers: {
    removeComment(state) {
      state.comments = [];
      state.commentsTree = [];
      state.loading = true;
    },
  },
});

export const { removeComment } = commentSlice.actions;

export const newsReducer = newsSlice.reducer;
export const commentReducer = commentSlice.reducer;
