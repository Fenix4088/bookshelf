/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from "./utils/api-client.exercise";

export const getUser = async () => {
    let user = null;
    const token = await auth.getToken()

    if(token) {
        const data = await client('me', {token})
        user = data.user;
    }

    return user

}

function App() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        getUser().then(setUser);
    }, [])

    const login = ({username, password}) => auth.login({username, password}).then(setUser);
    const registration = ({username, password}) => auth.register({username, password}).then(setUser);
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
