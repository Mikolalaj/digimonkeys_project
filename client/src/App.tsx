import { RecoilRoot } from 'recoil';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './MyRoutes';
import './App.scss';


function App() {    
    return (
    <RecoilRoot>
        <BrowserRouter>
            <AuthProvider>
                <MyRoutes />
            </AuthProvider>
        </BrowserRouter>
    </RecoilRoot>
    );
}

export default App;
