import { Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Loading from "../another/Loading"
import { removeComment } from "../../store/commentSlice"

 
const NewsDetail = () => {

    const dispatch = useDispatch();
    
    const params = useParams();
    const id = params.id;
    const { news, loading } = useSelector(state => state.news);
    const stories = news.filter((stories) => stories.id == id)[0];
    
    return (
        <>
            {loading ? 
            <div className="d-flex justify-content-center m-5">
                <Loading/>
            </div>
            :   
            <Card>
                    <Card.Header>
                        <Card.Title className="text-center">
                            {stories.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {stories.by}
                        </Card.Text>
                        <Card.Text>
                            {Date(stories.time)}
                        </Card.Text>
                        <div className="d-flex justify-content-between ">
                            <Button as={Link} to={stories.url}>
                                Посмотреть новость
                            </Button>
                            <Button as={Link} to="/" onClick={() => dispatch(removeComment())}>
                                Вернуться к новостям
                            </Button>
                        </div>
                    </Card.Body>
            </Card>
            }
        </>
            
    )
}

export default NewsDetail;