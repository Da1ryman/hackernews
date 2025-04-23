import { Card } from "react-bootstrap"

const NewsCard = (props) => {
    return (
        <Card>
            <Card.Body className="d-flex justify-content-around">
                <Card.Title>
                    {props.name}
                </Card.Title>
                <Card.Text>
                    {props.rating}
                </Card.Text>
                <Card.Text>
                    {props.author}
                </Card.Text>
                <Card.Subtitle>
                    {props.date}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default NewsCard;