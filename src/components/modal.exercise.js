/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import {CircleButton, Dialog} from './lib'
import VisuallyHidden from '@reach/visually-hidden'

export const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))

export const ModalContext = React.createContext(null)

export const Modal = props => {
  const isOpenState = React.useState(false)

  return <ModalContext.Provider value={isOpenState} {...props} />
}

export const ModalDismissButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

export const ModalOpenButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

const circleDismissButton = (
  <div css={{display: 'flex', justifyContent: 'flex-end'}}>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

export const ModalContentsBase = props => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

export const ModalContents = ({title, children, ...props}) => {
  return (
    <ModalContentsBase {...props}>
      {circleDismissButton}
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}
