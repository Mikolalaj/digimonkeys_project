import './App.css';
import * as React from 'react';
import { useContext } from 'react';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Topbar from './components/Topbar';
import { AuthContext, AuthProvider } from './context/AuthContext';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

function AuthenticatedRoute() {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />
}

function MyRoutes(): JSX.Element {
    return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Login />} />
        <Route path='/' element={<AuthenticatedRoute />} >
            <Route path='/' element={<><Topbar /><Navigate to={'/dashboard'} /></>} />
            {/* <Route path='/' element={<Navigate to={'/dashboard'} />}/> */}
        </Route>
        <Route path='/dashboard' element={<AuthenticatedRoute />} >
            <Route path='/dashboard' element={<><Topbar /><Dashboard /></>} />
            {/* <Route path='/dashboard' element={<Dashboard />}/> */}
        </Route>
    </Routes>
    )
}

function App() {    
    return (
    <BrowserRouter>
        <AuthProvider>
            <MyRoutes />
        </AuthProvider>
    </BrowserRouter>
    );
}

export default App;
