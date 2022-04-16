import React from 'react'
import {useAsync} from '../utils/hooks'
import * as auth from '../auth-provider'
import {client} from '../utils/api-client'
import {FullPageErrorFallback, FullPageSpinner} from '../components/lib'

export const AuthContext = React.createContext(null)

export const useAuth = () => {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error(`You should use useAuth with AuthProvider`)

  return ctx
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

export const AuthProvider = ({children}) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider value={{user, logout, login, register}}>
        {children}
      </AuthContext.Provider>
    )
  }

}
