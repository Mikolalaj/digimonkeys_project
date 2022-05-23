import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    const [authState, setAuthState] = useState({
        token,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : {}
    })

    function setAuthInfo({ token, expiresAt, userInfo }) {
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('expiresAt', expiresAt);
        setAuthState({
            token,
            expiresAt,
            userInfo
        });
    }

    function logout() {
        
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expiresAt');
        setAuthState({
            token: null,
            expiresAt: null,
            userInfo: {}
        });
    }

    function isAuthenticated() {
        return new Date().getTime() / 1000 < authState.expiresAt;
    }

    function isAdmin() {
        return authState.userInfo.admin;
    }

    return (
        <Provider
            value={{
                authState,
                setAuthState: authInfo => setAuthInfo(authInfo),
                isAuthenticated,
                isAdmin,
                logout
            }}
        >
        { children }
        </Provider>
    )
}

export { AuthContext, AuthProvider };