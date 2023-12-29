import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';

export default function Nav({ token, setToken }) {
  const client = useApolloClient();

  const handleLogout = () => {
    // Limpar o token e efetuar logout
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Link style={{ margin: '10px' }} to="/">
        <button>authors</button>
      </Link>
      <Link style={{ margin: '10px' }} to="/books">
        <button>book</button>
      </Link>

      {token && (
        <Link style={{ margin: '5px' }} to="/add">
          <button>add book</button>
        </Link>
      )}

      {token ? (
        <>
          <Link style={{ margin: '5px' }} to="/recommend">
            <button>recommend</button>
          </Link>

          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <Link style={{ margin: '5px' }} to="/login">
          <button>login</button>
        </Link>
      )}
    </div>
  );
}
