import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNewStoriesId,
  getStoriesDetail,
  getComment,
} from "../api/HackerNewsAPI";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  // try {
  const newsIds = await getNewStoriesId();
  const newsIteams = await Promise.all(
    newsIds.map((id) => getStoriesDetail(id))
  );
  return newsIteams;
  // } catch (err) {
  //   console.log(err);
  //   return err;
  // }
});

export const fetchNewsDetail = createAsyncThunk(
  "news/fetchNewsDetail",
  async (id) => {
    try {
      const newsById = await getStoriesDetail(id);
      return newsById;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (id) => {
    try {
      const news = await getStoriesDetail(id);
      if (!news.kids) {
        return [];
      }
      const comment = await Promise.all(
        news.kids.map((commentId) => getComment(commentId))
      );
      return comment;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchCommentTree = createAsyncThunk(
  "comment/fetchCommentTree",
  async ({ parent, kids }) => {
    try {
      const comments = await Promise.all(
        kids.map((commentId) => getComment(commentId))
      );
      return { parent, comments };
    } catch (err) {
      return { parent, comments: [] };
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsDetail: {},
    news: [],
    loading: true,
    error: false,
    loadingDetail: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.pending, (state) => {
        if (!state.news) {
          state.loading = true;
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = true;
        console.log(action.payload);
      });

    builder
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.newsDetail = action.payload;
        state.loadingDetail = false;
      })
      .addCase(fetchNewsDetail.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.error = true;
        console.log(action.payload);
      });
  },
});

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentsTree: [],
    loading: true,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.fulfilled, (state, action) => {
        if (action.payload) {
          state.comments = action.payload;
          state.loading = false;
        }
      })
      .addCase(fetchComment.pending, (state) => {
        if (!state.comments) {
          state.loading = true;
        }
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.error = true;
        console.log(action.payload);
      });

    builder.addCase(fetchCommentTree.fulfilled, (state, action) => {
      const { parent, comments } = action.payload;

      state.commentsTree = state.commentsTree.filter(
        (tree) => tree.parent !== parent
      );

      if (comments && comments.length > 0) {
        state.commentsTree.push({
          parent,
          comments,
        });
      }
    });
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
