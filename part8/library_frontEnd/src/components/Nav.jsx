import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <Link style={{ margin: '10px' }} to="/">
        <button>authors</button>
      </Link>
      <Link style={{ margin: '10px' }} to="/books">
        <button>book</button>
      </Link>
      <Link style={{ margin: '5px' }} to="/add">
        <button>add book</button>
      </Link>
    </div>
  );
}
