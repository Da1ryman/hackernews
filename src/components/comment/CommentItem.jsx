import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentTree } from "../../store/slice";
import { Loading } from "../another/Loading";

export const CommentItem = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);

  return (
    <>
      {!loading ? (
        !comments[0] ? (
          <div className="d-flex justify-content-center m-5">
            <p>Комментариев нет</p>
          </div>
        ) : (
          comments.map((comment) => (
            <>
              <ListGroup.Item key={comment.id} className="p-0">
                <p className="p-3">{comment.text}</p>
                <div className="border rounded-1 d-flex justify-content-between">
                  <p className="m-0 ms-3">author: {comment.by}</p>
                  <p className="m-0 me-3">date: {Date(comment.time)}</p>
                  <Button
                    onClick={() => dispatch(fetchCommentTree(comment.id))}
                  >
                    Комментарии
                  </Button>
                </div>
              </ListGroup.Item>
              {/* {!comm} */}
            </>
          ))
        )
      ) : (
        <div className="d-flex justify-content-center m-5">
          <Loading />
        </div>
      )}
    </>
  );
};
