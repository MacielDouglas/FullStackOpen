// import './index.css';

import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShow = () => {
    showAll === false ? setShowAll(true) : setShowAll(false);
  };

  return (
    <div className="blogStyle">
      {showAll ? (
        <>
          <p>
            {blog.title}
            <button onClick={() => handleShow()}>hide</button>
            <br />
            url: {blog.url} <br /> likes: {blog.likes}
            <button>like</button>
            <br />
            author: {blog.author}
          </p>
        </>
      ) : (
        <>
          <p>
            {blog.title}
            <button onClick={() => handleShow()}>view</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Blog;
