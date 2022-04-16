import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app.exercise'
import {AppProviders} from './context'

loadDevTools(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById('root'),
  )
})
