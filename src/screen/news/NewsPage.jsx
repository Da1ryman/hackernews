import { Container } from "react-bootstrap";
import { NewsDetail } from "../../components/news/NewsDetail";
import { useDispatch } from "react-redux";
import { fetchNewsDetail } from "../../store/slice";
import { useEffect } from "react";
import { CommentList } from "../../components/comment/CommentList";
import { useParams } from 'react-router-dom'

export const NewsPage = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(fetchNewsDetail(id));
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <NewsDetail />
      <CommentList />
    </Container>
  );
};
