import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [showAll, setShoAll] = useState(false)

  const handleShow = () => {
    showAll === false ? setShoAll(true) : setShoAll(false)
  }
  // Adicionar Like
  const handleAddLike = () => {
    const id = blog.id

    const changeBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    addLike(id, changeBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const removeButton = (blogUser) => {
    if (user.id === blogUser.user || user.id === blogUser.user.id) {
      return <button onClick={handleRemove}>remove</button>
    }
  }

  return (
    <div className="blogStyle blog">
      {showAll ? (
        <>
          <p>
            Title: {blog.title}
            <button onClick={handleShow}>hide</button> <br />
            Url: {blog.url}
            <br />
            Likes: {blog.likes} <button onClick={handleAddLike}>like</button>
            <br />
            Author: {blog.author} BlogUser:{blog.user.username} User_Usernae:
            {user.username}
            <br />
            {removeButton(blog)}
          </p>
        </>
      ) : (
        <p>
          {blog.title}
          <button onClick={handleShow} className="btn">
            view
          </button>
        </p>
      )}
    </div>
  )
}
export default Blog
