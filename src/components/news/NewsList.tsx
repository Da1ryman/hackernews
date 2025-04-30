import { Button, ListGroup } from 'react-bootstrap';
import { NewsItem } from './NewsItem';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Loading } from '../another/Loading';
import { fetchNews } from '../../store/newsslice/action';

export const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const reloadNews = () => dispatch(fetchNews());
  const reload = useAppSelector((state) => state.news.reload);

  useEffect(() => {
    const interval = setInterval(() => {
      reloadNews();
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <div className='m-3 d-flex justify-content-between'>
        <h1>Список новостей</h1>
        {!reload ? (
          <Button variant='primary' onClick={reloadNews} className='w-50'>
            Обновить список новостей
          </Button>
        ) : (
          <Button variant='secondary' className='w-25'>
            <Loading />
          </Button>
        )}
      </div>

      <ListGroup>
        <NewsItem />
      </ListGroup>
    </>
  );
};
