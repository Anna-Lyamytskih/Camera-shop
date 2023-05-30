import { Link } from 'react-router-dom';
import './not-found.css';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
  <>
    <Helmet>
      <title>Not Found - Escape Room</title>
    </Helmet>
    <section className="not_found">
      <h1>404. Page not found</h1>
    </section>
    <section className="back">
      <Link to="/">Вернуться на главную</Link>
    </section>
  </>
);

export default NotFound;
