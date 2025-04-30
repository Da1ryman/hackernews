import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../another/Loading';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeComment } from '../../store/commentslice/slice';

export const NewsDetail = () => {
  const dispatch = useAppDispatch();
  const removeComments = () => dispatch(removeComment());

  const { newsDetail, loadingDetail } = useAppSelector((state) => state.news);

  if (loadingDetail) {
    return (
      <div className='d-flex justify-content-center m-5'>
        <Loading />
      </div>
    );
  }

  if (!newsDetail) {
    return <div>News not found</div>;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title className='text-center'>{newsDetail.title}</Card.Title>
      </Card.Header>

      <Card.Body>
        <Card.Text>{newsDetail.by}</Card.Text>

        <Card.Text>
          {new Date(newsDetail.time * 1000).toLocaleString()}
        </Card.Text>

        <div className='d-flex justify-content-between '>
          <Button as={Link as any} to={newsDetail.url}>
            Посмотреть новость
          </Button>

          <Button as={Link as any} to='/' onClick={removeComments}>
            Вернуться к новостям
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
