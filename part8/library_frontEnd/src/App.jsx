import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import Notify from './components/Notify';
import Recommend from './components/Recommend';
import { useQuery } from '@apollo/client';
import { USER } from './queries';

export default function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useQuery(USER);

  // console.log(user.data.me);

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
