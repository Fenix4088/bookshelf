/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
    const [user, setUser] = React.useState(null);

    const login = ({username, password}) => auth.login({username, password}).then(user => setUser(user));
    const registration = ({username, password}) => auth.register({username, password}).then(user => setUser(user));
    const logout = () => {
        auth.logout().then(() => setUser(null))
    }


    return user ? <AuthenticatedApp logout={logout} user={user}/> :
        <UnauthenticatedApp login={login} register={registration}/>
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
