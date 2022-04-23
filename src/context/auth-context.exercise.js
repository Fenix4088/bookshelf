/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import {queryCache} from 'react-query'
import {setQueryDataForBook} from '../utils/books'

async function bootstrapAppData() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const {user: userData, listItems} = await client('bootstrap', {token})
    queryCache.setQueryData('list-items', listItems, {
      staleTime: 5000,
    })

    for (const listItem of listItems) {
      setQueryDataForBook(listItem.book)
    }
    user = userData
  }

  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const appDataPromise = bootstrapAppData()

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync()

  React.useEffect(() => {
    // we need to call getUser() sooner.
    // 🐨 move the next line to just outside the AuthProvider
    // 🦉 this means that as soon as this module is imported,
    // it will start requesting the user's data so we don't
    // have to wait until the app mounts before we kick off
    // the request.
    // We're moving from "Fetch on render" to "Render WHILE you fetch"!
    // const userPromise = getUser()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({user, login, logout, register}),
    [login, logout, register, user],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {
    user: {token},
  } = useAuth()
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
