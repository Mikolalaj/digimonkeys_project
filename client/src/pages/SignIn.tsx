import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/Login/LoginForm';
import RegisterForm from '../components/Login/RegisterForm';

import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import './Login.css'

export default function Login (): JSX.Element {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    return (
    authContext.isAuthenticated() ? <Navigate to='/dashboard' /> :
    <div className='login-box'>
        {location.pathname === '/login' ? <LoginForm /> : <RegisterForm />}
    </div>
    );
}
