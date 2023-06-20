import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // quando entrar na página, a aplicação verifique se os detalhes de um usuário logado já podem ser encontrados no local storage.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    localStorage.clear();
  };

  const messageResult = ({ message, error }) => {
    message ? setMessage(`${message}.`) : setErrorMessage(`${error}`);
    setTimeout(() => {
      setMessage(null);
      setErrorMessage(null);
    }, 5000);
  };

  // Adicionar novo Blog
  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newPost = await blogService.create(blogObject);
      setBlogs(blogs.concat(newPost));
      messageResult({ message: `A new blog: ${blogObject.title} added` });
    } catch (error) {
      messageResult({ error: `${error.response.data.error}` });
    }
  };

  //Adicionar Like
  const addLike = async (id, changeBlog) => {
    try {
      const updateBlog = await blogService.update(id, changeBlog);
      const newBlog = blogs.map((blog) => (blog.id === id ? updateBlog : blog));
      setBlogs(newBlog);
    } catch (exception) {
      messageResult({ error: `${exception.response.data.error}` });
    }
  };

  //remove
  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);

      const deletedBlog = blogs.filter((blog) => blog.id !== id);
      setBlogs(deletedBlog);
      messageResult({ message: `Blog removed` });
    } catch (error) {
      messageResult({ error: `${error}` });
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage} />
        <LoginForm
          user={user}
          setUser={setUser}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}
          loginService={loginService}
          blogService={blogService}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Notification errorMessage={errorMessage} />
      <p>
        {`${user.name}`} logged in{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={newBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default App;
