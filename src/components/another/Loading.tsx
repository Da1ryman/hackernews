import { Spinner } from 'react-bootstrap';

export const Loading = () => (
  <Spinner animation='border' role='status'>
    <span className='visually-hidden'>Loading...</span>
  </Spinner>
);
