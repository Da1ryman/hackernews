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
  commentsTree: Array<{
    parent: number;
    comments: Comment[];
  }>;
  loading: boolean;
  error: boolean;
}

export interface fetchCommentTreeArg {
  parent: number;
  kids: number[];
}

export interface CommentItemProps {
  parentId?: number;
  depth?: number; 
}