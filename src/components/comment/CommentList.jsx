import { ListGroup } from "react-bootstrap";
import { CommentItem } from "./CommentItem";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchComment } from "../../store/slice";
import { useEffect } from "react";

export const CommentList = () => {
  const params = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComment(params));
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-center m-5">
        <h2 className="mt-4">Комментарии</h2>
      </div>

      <ListGroup>
        <CommentItem />
      </ListGroup>
    </>
  );
};
