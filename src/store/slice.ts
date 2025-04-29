import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getNewStoriesId,
  getStoriesDetail,
  getComment,
} from '../api/HackerNewsAPI';
import { Comment, CommentState, fetchCommentTreeArg } from '../types/comment';
import { NewsItem, NewsState } from '../types/news';

export const fetchNews = createAsyncThunk<NewsItem[], void>(
  'news/fetchNews',
  async () => {
    try {
      const newsIds = await getNewStoriesId();
      const newsIteams = await Promise.all(
        newsIds.map((id: number) => getStoriesDetail(String(id))),
      );

      return newsIteams;
    } catch (err) {
      console.error(err);

      throw err;
    }
  },
);

export const fetchNewsDetail = createAsyncThunk<NewsItem, string>(
  'news/fetchNewsDetail',
  async (id: string) => {
    try {
      const newsById = await getStoriesDetail(id);

      return newsById;
    } catch (err) {
      console.error(err);

      throw err;
    }
  },
);

export const fetchComment = createAsyncThunk<Comment[], string>(
  'comment/fetchComment',
  async (id: string) => {
    try {
      const news = await getStoriesDetail(id);

      if (!news.kids) {
        return [];
      }

      const comments: Comment[] = await Promise.all(
        news.kids.map((commentId: number) => getComment(String(commentId))),
      );

      return comments;
    } catch (err) {
      console.error(err);

      throw err;
    }
  },
);

export const fetchCommentTree = createAsyncThunk<
  { parent: number; comments: Comment[] },
  fetchCommentTreeArg
>('comment/fetchCommentTree', async ({ parent, kids }) => {
  try {
    const comments = await Promise.all(
      kids.map((commentId) => getComment(String(commentId))),
    );

    return { parent, comments };
  } catch (err) {
    console.error(err);

    return { parent, comments: [] };
  }
});

const newsInitialState: NewsState = {
  newsDetail: null,
  news: [],
  loading: true,
  error: false,
  loadingDetail: true,
  reload: false,
};

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
        (
          state,
          action: PayloadAction<{
            parent: number;
            comments: Comment[];
          }>,
        ) => {
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
