import { Button, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { fetchCommentTree } from '../../store/slice';
import { Loading } from '../another/Loading';
import { Comment, CommentItemProps } from '../../types/comment';
import { RootState, useAppDispatch } from '../../store/store';

export const CommentItem: React.FC<CommentItemProps> = ({
  parentId,
  depth = 0,
}) => {
  const dispatch = useAppDispatch();
  const { comments, loading, commentsTree } = useSelector(
    (state: RootState) => state.comment,
  );

  const currentComments = parentId
    ? commentsTree.find((tree) => tree.parent === parentId)?.comments || []
    : comments;

  if (loading && !parentId) {
    return (
      <div className='d-flex justify-content-center m-5'>
        <Loading />
      </div>
    );
  }

  if (!currentComments || currentComments.length === 0) {
    return !parentId ? (
      <div className='d-flex justify-content-center m-5'>
        <p>Комментариев нет</p>
      </div>
    ) : null;
  }

  return currentComments.map((comment: Comment) => (
    <div key={comment.id} style={{ marginLeft: `${depth * 20}px` }}>
      <ListGroup.Item className='p-0 mb-2'>
        <p className='p-3'>{comment.text}</p>

        <div className='border rounded-1 d-flex justify-content-between'>
          <p className='m-0 ms-3'>author: {comment.by}</p>

          <p className='m-0 me-3'>
            date: {new Date(comment.time * 1000).toLocaleString()}
          </p>

          {comment.kids && (
            <Button
              onClick={() =>
                dispatch(
                  fetchCommentTree({
                    parent: comment.id,
                    kids: comment.kids || [],
                  }),
                )
              }
            >
              Показать ответы ({comment.kids.length})
            </Button>
          )}
        </div>
      </ListGroup.Item>

      {commentsTree.some((tree) => tree.parent === comment.id) && (
        <CommentItem parentId={comment.id} depth={depth + 1} />
      )}
    </div>
  ));
};
