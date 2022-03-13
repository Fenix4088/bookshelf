import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'


export const App = () => {

  const [openModal, setOpenModal] = React.useState('none')

  const login = () => setOpenModal('login')
  const register = () => setOpenModal('register')

  const handleSubmit = (formData) => {
    console.log(formData)
  }

  return (
    <>
      <Dialog aria-label='Login form' isOpen={openModal === 'login'} onDismiss={() => setOpenModal('none')}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm buttonText={'Login'} onSubmit={handleSubmit} />
      </Dialog>
      <Dialog aria-label='Registration form' isOpen={openModal === 'register'} onDismiss={() => setOpenModal('none')}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm buttonText={'Register'} onSubmit={handleSubmit} />
      </Dialog>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </>
  )
}


export const LoginForm = ({onSubmit, buttonText}) => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const onUsernameChange = ({currentTarget: {value}}) => {
    setFormData(fD => ({...fD, username: value}))
  }
  const onPasswordChange = ({currentTarget: {value}}) => {
    setFormData(fD => ({...fD, password: value}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input value={formData.username} type='text' name={'username'}
               onChange={onUsernameChange} />
      </label>
      <label>
        <input value={formData.password} type='password' name={'username'}
               onChange={onPasswordChange} />
      </label>
      <button>{buttonText}</button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
