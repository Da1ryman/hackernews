import { Container } from "react-bootstrap";
import { NewsDetail } from "../../components/news/NewsDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsDetail } from "../../store/slice";
import { useEffect } from "react";
import { CommentList } from "../../components/comment/CommentList";
import { useParams } from "react-router-dom";
import { Error } from "../../components/another/Error";

export const NewsPage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.news);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(fetchNewsDetail(id));
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
