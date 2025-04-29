import { ListGroup } from 'react-bootstrap';
import { CommentItem } from './CommentItem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComment, removeComment } from '../../store/slice';
import { useEffect } from 'react';
import { Error } from '../another/Error';
import { RootState, useAppDispatch } from '../../store/store';

export const CommentList = () => {
  const id = useParams().id;
  const dispatch = useAppDispatch();
  const { error, comments } = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    dispatch(fetchComment(String(id)));

    return () => {
      dispatch(removeComment());
    };
  }, [dispatch, id]);

  return (
    <>
      <div className='d-flex m-2'>
        <h2 className='mt-4'>
          Комментарии {comments ? comments.length : null}
        </h2>
      </div>

      {!error ? (
        <ListGroup>
          <CommentItem />
        </ListGroup>
      ) : (
        <Error />
      )}
    </>
  );
};
