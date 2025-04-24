import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNewStoriesId,
  getStoriesDetail,
  getComment,
} from "../api/HackerNewsAPI";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const newsIds = await getNewStoriesId();
    const newsIteams = await Promise.all(
      newsIds.map((id) => getStoriesDetail(id))
    );
    return newsIteams;
  } catch (err) {
    return err;
  }
});

export const fetchNewsDetail = createAsyncThunk(
  "news/fetchNewsDetail",
  async (id) => {
    try {
      const newsById = await getStoriesDetail(id);
      return newsById;
    } catch (err) {
      return err;
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
      return err;
    }
  }
);

export const fetchCommentTree = createAsyncThunk(
  "comment/fetchCommentTree",
  async (id) => {
    try {
      const comment = await getComment(id);
      if (!comment.kids) {
        return [];
      }
      const comments = await Promise.all(
        comment.kids.map((commentId) => getComment(commentId))
      );
      return comments;
    } catch (err) {
      return err;
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
      });

    builder
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.newsDetail = action.payload;
        state.loadingDetail = false;
      })
      .addCase(fetchNewsDetail.pending, (state, action) => {
        state.loadingDetail = true;
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
    status: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComment.pending, (state) => {
        if (!state.comments) {
          state.loading = true;
        }
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.error = true;
        state.status = action.payload;
      });

    builder.addCase(fetchCommentTree.fulfilled, (state, action) => {
      if (action.payload) {
        const { parent } = action.payload[0];
        state.commentsTree.push({
          id: parent,
          comments: action.payload,
        });
        state.commentsTree = action.payload;
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
