import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')


export const App = () => {

  const login = () => console.log('Login')
  const register = () => console.log('Registration')

  return (
    <>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
