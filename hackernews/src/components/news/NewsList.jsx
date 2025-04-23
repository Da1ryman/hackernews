import { Button, ListGroup } from "react-bootstrap"
import NewsItem from "./NewsItem"
import { useDispatch } from "react-redux"
import { fetchNews } from "../../store/newsSlice"
import { useEffect } from "react"


const NewsList = () => {
    
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(fetchNews())
        const interval = setInterval(() => {
            dispatch(fetchNews())
        }, 60000)
    }, [dispatch])

    return (
        <>
            <div className="m-3 d-flex justify-content-between"> 
                <h1>
                    Список новостей
                </h1>   
                <Button variant="primary" onClick={() => dispatch(fetchNews())}>
                    Обновить список новостей 
                </Button> 
            </div>
            
            <ListGroup>
                <NewsItem/>
            </ListGroup>
        </>
        
    )
}

export default NewsList;