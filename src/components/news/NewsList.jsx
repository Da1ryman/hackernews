import { Button, ListGroup } from "react-bootstrap";
import { NewsItem } from "./NewsItem";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../store/slice";
import { useEffect } from "react";

export const NewsList = () => {
  const dispatch = useDispatch();
    const reloadNews = () => dispatch(fetchNews())

  useEffect(() => {
    reloadNews()
    const interval = setInterval(() => {
        reloadNews();
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <div className="m-3 d-flex justify-content-between">
        <h1>Список новостей</h1>
        <Button variant="primary" onClick={reloadNews}>
          Обновить список новостей
        </Button>
      </div>

      <ListGroup>
        <NewsItem />
      </ListGroup>
    </>
  );
};
