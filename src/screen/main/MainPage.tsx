import { Container } from "react-bootstrap";
import { NewsList } from "../../components/news/NewsList";
import { useSelector } from "react-redux";
import { Error } from "../../components/another/Error";
import { RootState } from "../../store/store";

export const MainPage: React.FC = () => {
  const { error } = useSelector((state: RootState) => state.news);

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
