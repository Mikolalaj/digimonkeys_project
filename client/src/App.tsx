import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './MyRoutes';


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
