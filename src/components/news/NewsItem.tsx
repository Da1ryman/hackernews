import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../another/Loading';
import { useAppSelector } from '../../store/store';

export const NewsItem = () => {
  const { news, loading } = useAppSelector((state) => state.news);

  return loading ? (
    <div className='text-center'>
      <Loading />
    </div>
  ) : (
    <>
      {news.map((stories) => (
        <ListGroup.Item
          key={stories.id}
          className='m-3 border rounded-2'
          as={Link}
          to={`/news/${stories.id}`}
        >
          <h2>{stories.title}</h2>
          <p>
            &#9733;{stories.score}{' '}
            {new Date(stories.time * 1000).toLocaleString()}
          </p>
          Author: {stories.by}
        </ListGroup.Item>
      ))}
    </>
  );
};
