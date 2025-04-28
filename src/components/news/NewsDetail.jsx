import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { Loading } from "../another/Loading";
import { removeComment } from "../../store/slice";

export const NewsDetail = () => {
  const dispatch = useDispatch();

  const { newsDetail, loadingDetail } = useSelector((state) => state.news);

  const removeComments = () => dispatch(removeComment())
  

  return loadingDetail ? (
        <div className="d-flex justify-content-center m-5">
          <Loading />
        </div>
      ) : (
        <Card>
          <Card.Header>
            <Card.Title className="text-center">{newsDetail.title}</Card.Title>
          </Card.Header>

          <Card.Body>
            <Card.Text>{newsDetail.by}</Card.Text>

            <Card.Text>{Date(newsDetail.time)}</Card.Text>

            <div className="d-flex justify-content-between ">
              <Button as={Link} to={newsDetail.url}>
                Посмотреть новость
              </Button>

              <Button
                as={Link}
                to="/"
                onClick={removeComments}
              >
                Вернуться к новостям
              </Button>
            </div>
          </Card.Body>
        </Card>
      )
};
