import { ListGroup, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loading from "../another/Loading"


const NewsItem = () => {
    const { news, loading } = useSelector(state => state.news)

    return (
        <>
            {loading ? 
                <div className="text-center">
                    <Loading/>
                </div>
                
                :  
            news.map((stories) => (
                <ListGroup.Item key={stories.id} className="m-3 border rounded-2" as={Link} to={`/news/${stories.id}`}>
                    <h2>
                        {stories.title}
                    </h2>
                    <p>
                    &#9733;{stories.score} {Date(stories.time)}
                    </p>
                    
                    Author: {stories.by}
                </ListGroup.Item>
            ))}
        </>
        
    )
}

export default NewsItem;