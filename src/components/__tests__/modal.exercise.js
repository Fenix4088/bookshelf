import * as React from 'react'
import {Modal, ModalContents, ModalOpenButton} from '../modal'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('can be opened and closed', () => {
  const label = 'Modal Label'
  const title = 'Modal Title'
  const content = 'Modal content'
  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        <div>{content}</div>
      </ModalContents>
    </Modal>,
  )

  const openButton = screen.getByRole('button', {name: /Open/})
  userEvent.click(openButton)

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', label)

  const inModal = within(modal)

  expect(inModal.getByRole('heading', {name: title})).toBeInTheDocument()
  expect(inModal.getByText(content)).toBeInTheDocument()
  userEvent.click(inModal.getByRole('button', {name: /close/i}))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
