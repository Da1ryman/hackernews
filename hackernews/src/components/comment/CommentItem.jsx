import { Button, ListGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchCommentTree } from "../../store/commentSlice";


const CommentItem = () => {
    
    const dispatch = useDispatch();
    const { comment, commentTree, loading } = useSelector(state => state.comment);

    return (
        <>
            {comment.map((comments) => (
                <>
                    <ListGroup.Item key={comments.id} className="p-0" >
                        
                        <p className="p-3"> 
                            {comments.text}
                        </p>
                        <div className="border rounded-1 d-flex justify-content-between">
                            <p className="m-0 ms-3">
                                author: {comments.by}
                            </p>
                            <p className="m-0 me-3">
                                date: {Date(comments.time)}
                            </p>
                            <Button onClick={() => dispatch(fetchCommentTree(comments.id))}>
                                Комментарии
                            </Button>
                        </div>
                        
                    </ListGroup.Item>
                    {!commentTree ? null : commentTree[0].parent == comments.id ?  commentTree.map((commentsTree) => (
                        <>
                            <ListGroup className="ms-4 me-4" key={commentsTree.id}> 
                                <ListGroup.Item key={commentsTree.id} className="p-0">
                                
                                    <p className="p-3"> 
                                        {commentsTree.text}
                                    </p>
                                    <div className="border rounded-1 d-flex justify-content-between">
                                        <p className="m-0 ms-3">
                                            author: {commentsTree.by}
                                        </p>
                                        <p className="m-0 me-3">
                                            date: {Date(commentsTree.time)}
                                        </p>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </>
                        
                        
                    ))  :
                    null
                }             
                </>
            ))}
        </>
    )
}

export default CommentItem;