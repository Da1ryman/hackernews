import { Container } from "react-bootstrap"
import NewsDetail from "../../components/news/NewsDetail";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../store/newsSlice";
import { useEffect } from "react";
import CommentList from "../../components/comment/CommentList";


const NewsPage = () => {
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(fetchNews())
    }, [dispatch])

    return (
        <Container className="mt-4">
            <NewsDetail/>
            <CommentList />
        </Container>
    )
}

export default NewsPage;