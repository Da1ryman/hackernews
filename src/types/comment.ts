export interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
  parent?: number;
}

export interface CommentState {
  comments: Comment[];
  commentsTree: Array<commentsTree>;
  loading: boolean;
  error: boolean;
}

export interface fetchCommentTreeArg {
  parent: number;
  kids: number[];
}

export interface commentsTree {
  parent: number;
  comments: Comment[];
}

export interface CommentItemProps {
  parentId?: number;
  depth?: number;
}
