import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getComment,
  getNewStoriesId,
  getStoriesDetail,
} from '../api/HackerNewsAPI';
import { Comment, commentsTree, fetchCommentTreeArg } from '../types/comment';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
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
});

export const fetchNewsDetail = createAsyncThunk(
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

export const fetchComment = createAsyncThunk(
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
  commentsTree,
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
