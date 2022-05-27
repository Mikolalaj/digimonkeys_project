import { useState, useEffect, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
  
function dataFetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: action.payload
            };
        default:
            throw new Error();
    }
};
  
function useAPI(method, initialUrl, initialData, initialParams, initialIsReady=true) {
    const [csrfToken, setCsrfToken] = useState('');
    const [url, setUrl] = useState(initialUrl);
    const [requestData, setRequestData] = useState(null);
    const [params, setParams] = useState(initialParams);
    const [isReady, setIsReady] = useState(initialIsReady);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: initialData,
        errorMessage: ''
    });

    function refresh() {
        setIsReady(false);
        setCsrfToken('');
        setIsReady(true);
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        async function getCsrfToken() {
            try {
                const { data } = await axios.get('/api/csrf-token', { cancelToken: source.token });
                setCsrfToken(data.csrfToken);
            } catch (error) {
                if (axios.isCancel(error)) { }
                else {
                    throw error;
                }
            }
        }

        if (isReady) {
            getCsrfToken();
        }

        return () => {
            source.cancel();
        };

    }, [isReady]);

    useEffect(() => {
        let didCancel = false;

        async function fetchData() {

            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios(url, {
                    method: method,
                    baseURL: process.env.REACT_APP_API_URL,
                    data: requestData,
                    params: params,
                    credentials: 'include',
                    withCredentials: true,
                    headers: { 'X-CSRF-TOKEN': csrfToken }
                });

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                    setIsReady(false);
                    setCsrfToken('');
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE', payload: error.response.data.message });
                    console.log(error)
                    console.log(error.response.data.message)
                    if (error.response.status === 401) {
                        logout();
                        navigate('/login');
                    }
                    setIsReady(false);
                    setCsrfToken('');
                }
            }
        };

        if (isReady && csrfToken !== '') {
            fetchData();
        }

        return () => {
            didCancel = true;
        };

    }, [url, isReady, csrfToken]);

    return [state, setUrl, setRequestData, setParams, setIsReady, refresh];
};

export default useAPI