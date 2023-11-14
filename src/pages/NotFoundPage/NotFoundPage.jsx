import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      Sorry, the page with this route does not exist. Please go to the
      <Link to="/">HOME PAGE</Link>
    </div>
  );
};

export default NotFoundPage;
