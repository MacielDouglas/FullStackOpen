import { useState } from 'react';

const Blog = ({ blog, addLike }) => {
  const [showAll, setShoAll] = useState(false);

  const handleShow = () => {
    showAll === false ? setShoAll(true) : setShoAll(false);
  };

  // Adicionar Like
  const handleAddLike = () => {
    const id = blog.id;

    const changeBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    addLike(id, changeBlog);
  };

  return (
    <div className="blogStyle">
      {showAll ? (
        <>
          <p>
            Title: {blog.title}
            <button onClick={() => handleShow()}>hide</button> <br />
            Url: {blog.url}
            <br />
            Likes: {blog.likes} <button onClick={handleAddLike}>like</button>
            <br />
            Author: {blog.author}
          </p>
        </>
      ) : (
        <p>
          {blog.title}
          <button onClick={() => handleShow()}>view</button>
        </p>
      )}
    </div>
  );
};
export default Blog;
