import { Container } from 'react-bootstrap';
import { NewsList } from '../../components/news/NewsList';
import { Error } from '../../components/another/Error';
import { useAppSelector } from '../../store/store';

export const MainPage = () => {
  const error = useAppSelector((state) => state.news.error);

  return !error ? (
    <Container>
      <NewsList />
    </Container>
  ) : (
    <Error />
  );
};
