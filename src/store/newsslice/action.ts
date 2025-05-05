import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNewStoriesId, getStoriesDetail } from '../../api/HackerNewsAPI';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  try {
    const newsIds = await getNewStoriesId();
    const newsIteams = await Promise.all(
      newsIds.map((id) => getStoriesDetail(String(id))),
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
