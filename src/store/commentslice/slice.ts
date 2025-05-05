import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComment, fetchCommentTree } from './action';
import { commentInitialState } from './initialState';
import { Comment, commentsTree } from '../../types/comment';

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

export const commentReducer = commentSlice.reducer;
