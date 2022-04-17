import React from 'react'
import {Dialog} from './lib'
import button from 'bootstrap/js/src/button'

export const ModalContext = React.createContext(null)

export const Modal = props => {
  const isOpenState = React.useState(false)

  return <ModalContext.Provider value={isOpenState} {...props} />
}

export const ModalDismissButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)

  return React.cloneElement(child, {
    onClick: () => setIsOpen(false),
  })
}

export const ModalOpenButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)

  return React.cloneElement(child, {
    onClick: () => setIsOpen(true),
  })
}

export const ModalContents = ({props, children}) => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      {children}
    </Dialog>
  )
}

