import { ListGroup } from "react-bootstrap"
import CommentItem from "./CommentItem";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { fetchComment } from "../../store/commentSlice";
import { useEffect } from "react";


const CommentList = () => {
    const params = useParams().id
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComment(params))
    }, [dispatch])

    return (
        <>
            <h2 className="mt-4">
                Комментарии
            </h2>
            <ListGroup>
                <CommentItem/>
            </ListGroup>
        </>
    )
}

export default CommentList;