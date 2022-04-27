import * as React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'
import {localStorageKey} from 'auth-provider'

// 🐨 after each test, clear the queryCache and auth.logout

afterEach(async () => {
  queryCache.clear()
  await auth.logout()
})

test('renders all the book information', async () => {
  localStorage.setItem(localStorageKey, 'SOME FAKE TOKEN')

  const user = buildUser()
  const book = buildBook()

  const route = `/book/${book.id}`
  window.history.pushState({}, 'Test page', route)

  const originalFetch = window.fetch
  window.fetch = async (url, config) => {
    console.log(url)
    if (url.endsWith('/bootstrap')) {
      return {
        ok: true,
        json: async () => ({
          user: {...user, token: 'SOME_FAKE_TOKEN'},
          listItems: [],
        }),
      }
    } else if (url.endsWith(`/books/${book.id}`)) {
      return {ok: true, json: async () => ({book})}
    }
    return originalFetch(url, config)
  }

  const {debug} = render(<App />, {wrapper: AppProviders})

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // debug();
  // screen.debug();

  expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
  expect(screen.getByText(book.author)).toBeInTheDocument()
  expect(screen.getByText(book.publisher)).toBeInTheDocument()
  expect(screen.getByText(book.synopsis)).toBeInTheDocument()
  expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl,
  )

  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('textbox', {name: /notes/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
})

