import { Button, ListGroup } from "react-bootstrap";
import { NewsItem } from "./NewsItem";
import { fetchNews } from "../../store/slice";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { Loading } from "../another/Loading";

export const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const reloadNews = () => dispatch(fetchNews());
  const { reload } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    const interval = setInterval(() => {
      reloadNews();
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <div className="m-3 d-flex justify-content-between">
        <h1>Список новостей</h1>
        {!reload ? (
          <Button variant="primary" onClick={reloadNews} className="w-50">
            Обновить список новостей
          </Button>
        ) : (
          <Button variant="secondary" className="w-25">
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
