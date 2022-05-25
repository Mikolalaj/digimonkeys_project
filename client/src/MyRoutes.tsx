import { useContext } from 'react';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Topbar from './components/Topbar';
import { AuthContext } from './context/AuthContext';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

function AuthenticatedRoute() {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    return isAuthenticated() ? <><Topbar /><Outlet /></> : <Navigate to='/login' />
}

export default function MyRoutes () {
    return (
    <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignIn />} />
        <Route path='/' element={<AuthenticatedRoute />} >
            <Route path='/' element={<Navigate to={'/dashboard'} />}/>
        </Route>
        <Route path='/dashboard' element={<AuthenticatedRoute />} >
            <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
    </Routes>
    )
}
