import { Container } from "react-bootstrap"
import NewsCard from "../../components/newscard/NewsCard"

const MainPage = () => {
    const news = state.map((news) => (
        <li>
            <NewsCard name={news.name} rating={news.rating}/>
        </li>
    ))
    
    return (
        <Container>
            <ul>
                {news}
            </ul>
        </Container>
    )
}

export default MainPage;