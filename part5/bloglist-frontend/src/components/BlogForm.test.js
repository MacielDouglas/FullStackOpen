import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('<BlogForm /> test for the new blog form ', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Jabotica, fruta que da no tronco.')
  await user.type(authorInput, 'Carlos da Cunha')
  await user.type(urlInput, 'www.enviar.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    author: 'Carlos da Cunha',
    title: 'Jabotica, fruta que da no tronco.',
    url: 'www.enviar.com',
  })
})
