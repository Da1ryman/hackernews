import { Container } from "react-bootstrap";
import { NewsList } from "../../components/news/NewsList";
import { useSelector } from "react-redux";
import { Error } from "../../components/another/Error";

export const MainPage = () => {
  const error = useSelector((state) => state.news.error);

  return (
    <>
      {!error ? (
        <Container>
          <NewsList />
        </Container>
      ) : (
        <Error />
      )}
    </>
  );
};
