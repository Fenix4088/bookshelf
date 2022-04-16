import React from 'react';

export const AuthContext = React.createContext(null);

export const useAuth = () => {
    const ctx = React.useContext(AuthContext);
    if(!ctx) throw new Error(`You should use useAuth with AuthProvider`)

    return ctx;
}