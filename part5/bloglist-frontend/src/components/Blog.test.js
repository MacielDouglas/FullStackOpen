import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
  title: 'Title rendered inside the component',
  author: 'User Testing Application',
  user: 'userOne',
  url: 'www.usertest.com',
  likes: 0,
}

test("renders the blog's title and author", () => {
  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Title rendered inside the component',
    'User Testing Application',
  )
  expect(element).toBeDefined()
})

test("checks that the blog's URL and number of likes are shown", async () => {
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('p')
  expect(div).toHaveTextContent('www.usertest.com', 0)
})

test(" checks that the blog's URL and number of likes are shown when the button", async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
