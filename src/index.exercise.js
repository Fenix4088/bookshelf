import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'


export const App = () => {

  const [openModal, setOpenModal] = React.useState('none')

  const login = () => setOpenModal('login')
  const register = () => setOpenModal('register')

  return (
    <>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'} onDismiss={() => setOpenModal('none')}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'} onDismiss={() => setOpenModal('none')}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
      </Dialog>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
