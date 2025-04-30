import { ListGroup } from 'react-bootstrap';
import { CommentItem } from './CommentItem';
import { useParams } from 'react-router-dom';
import { removeComment } from '../../store/slice';
import { useEffect } from 'react';
import { Error } from '../another/Error';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchComment } from '../../store/action';

export const CommentList = () => {
  const id = useParams().id;
  const dispatch = useAppDispatch();
  const { error, comments } = useAppSelector((state) => state.comment);

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
