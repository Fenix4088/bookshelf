import React from 'react'
import {Dialog} from './lib'

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

export const ModalContents = props => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}
