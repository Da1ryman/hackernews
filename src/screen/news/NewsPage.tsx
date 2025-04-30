import { Container } from 'react-bootstrap';
import { NewsDetail } from '../../components/news/NewsDetail';
import { useEffect } from 'react';
import { CommentList } from '../../components/comment/CommentList';
import { useParams } from 'react-router-dom';
import { Error } from '../../components/another/Error';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchNewsDetail } from '../../store/action';

export const NewsPage = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.news.error);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchNewsDetail(String(id)));
  }, [dispatch]);

  return !error ? (
    <Container className='mt-4'>
      <NewsDetail />

      <CommentList />
    </Container>
  ) : (
    <Error />
  );
};
