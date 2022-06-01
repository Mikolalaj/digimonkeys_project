import {
    RecoilRoot,
    selector,
    useRecoilValue,
} from 'recoil';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './MyRoutes';
import './App.css';


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
