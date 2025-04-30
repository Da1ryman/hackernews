import { CommentState } from '../../types/comment';

export const commentInitialState: CommentState = {
  comments: [],
  commentsTree: [],
  loading: true,
  error: false,
};
