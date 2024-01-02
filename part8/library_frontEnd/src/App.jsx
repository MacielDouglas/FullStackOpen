import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import Notify from './components/Notify';
import Recommend from './components/Recommend';
import { useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED, USER } from './queries';

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

export default function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useQuery(USER);
  const books = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data);
      const addedBook = data.data.bookAdded;
      try {
        window.alert(`${addedBook.title} added`);
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      } catch {
        console.log('error');
      }

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <BrowserRouter>
      <Notify errorMessage={errorMessage} />
      <Nav token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={notify} />}
        />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </BrowserRouter>
  );
}
