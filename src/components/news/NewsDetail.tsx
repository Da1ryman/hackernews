import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../another/Loading';
import { removeComment } from '../../store/slice';
import { RootState } from '../../store/store';

export const NewsDetail = () => {
  const dispatch = useDispatch();
  const removeComments = () => dispatch(removeComment());

  const { newsDetail, loadingDetail } = useSelector(
    (state: RootState) => state.news,
  );

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
    <>
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
    </>
  );
};
