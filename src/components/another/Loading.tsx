import { Spinner } from "react-bootstrap";

export const Loading: React.FC = () => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

