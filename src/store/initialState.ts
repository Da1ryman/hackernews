import { CommentState } from '../types/comment';
import { NewsState } from '../types/news';

export const newsInitialState: NewsState = {
  newsDetail: null,
  news: [],
  loading: true,
  error: false,
  loadingDetail: true,
  reload: false,
};

export const commentInitialState: CommentState = {
  comments: [],
  commentsTree: [],
  loading: true,
  error: false,
};
