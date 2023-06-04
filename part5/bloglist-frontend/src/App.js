import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import './index.css';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      // messageResult({ message: `${user.name} logged in` });
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  //Adicionar novo
  const addNewBlog = (event) => {
    event.preventDefault();
    console.log('Funcionando');
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      messageResult({ message: `A new blog: ${newTitle} added` });
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
    });
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const messageResult = ({ message }) => {
    setMessage(`${message}.`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    localStorage.clear();
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errormessage={errorMessage} />
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />
      <p>
        {`${user.name}`} logged in{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>

      <BlogForm
        addNewBlog={addNewBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange={handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange={handleUrlChange}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
