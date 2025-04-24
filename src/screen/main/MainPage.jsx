import { Container } from "react-bootstrap";
import { NewsList } from "../../components/news/NewsList";

export const MainPage = () => {
  return (
    <Container>
      <NewsList />
    </Container>
  );
};
