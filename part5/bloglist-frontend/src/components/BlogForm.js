import React from 'react';

const BlogForm = ({
  addNewBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
