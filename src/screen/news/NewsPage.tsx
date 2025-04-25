import { Container } from "react-bootstrap";
import { NewsDetail } from "../../components/news/NewsDetail";
import { fetchNewsDetail } from "../../store/slice";
import { useEffect } from "react";
import { CommentList } from "../../components/comment/CommentList";
import { useParams } from "react-router-dom";
import { Error } from "../../components/another/Error";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

export const NewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.news);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchNewsDetail(String(id)));
  }, [dispatch]);

  return (
    <>
      {!error ? (
        <Container className="mt-4">
          <NewsDetail />
          <CommentList />
        </Container>
      ) : (
        <Error />
      )}
    </>
  );
};
