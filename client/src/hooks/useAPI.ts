import { useState, useEffect, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Method, AxiosError } from 'axios';

enum ApiActionType {
    INIT = 'INIT',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

interface ApiAction {
    type: ApiActionType;
    payload?: any;
}

type ApiState = {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: any;
    errorMessage: string;
}

function dataFetchReducer(state: ApiState, action: ApiAction): ApiState {
    switch (action.type) {
        case ApiActionType.INIT:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false
            };
        case ApiActionType.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload
            };
        case ApiActionType.FAILURE:
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

type Initials = {
    url: string;
    requestData?: {};
    resultData?: {} | [];
    params?: {};
    isReady?: boolean;
}

  
function useAPI( method: Method, initials: Initials) {
    const [csrfToken, setCsrfToken] = useState<string>('');
    const [url, setUrl] = useState<string>(initials.url);
    const [requestData, setRequestData] = useState<{} | undefined>(initials.requestData);
    const [params, setParams] = useState<{} | undefined>(initials.params);
    const [isReady, setIsReady] = useState<boolean>(initials.isReady === undefined ? true : initials.isReady);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: initials.resultData || {},
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

            dispatch({ type: ApiActionType.INIT });

            try {
                const result = await axios(url, {
                    method: method,
                    baseURL: process.env.REACT_APP_API_URL,
                    data: requestData,
                    params: params,
                    withCredentials: true,
                    headers: { 'X-CSRF-TOKEN': csrfToken }
                });

                if (!didCancel) {
                    dispatch({ type: ApiActionType.SUCCESS, payload: result.data });
                    setIsReady(false);
                    setCsrfToken('');
                }
            } catch (error) {
                if (!didCancel) {
                    if (error instanceof AxiosError) {
                        dispatch({ type: ApiActionType.FAILURE, payload: error.response!.data.message });
                        console.log(error.response!.data.message);
                        console.log(error)
                        if (error.response!.status === 401) {
                            logout();
                            navigate('/login');
                        }
                        setIsReady(false);
                        setCsrfToken('');
                    } else {
                        throw error;
                    }
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

    return {state, setUrl, requestData, setRequestData, params, setParams, setIsReady, refresh};
};

export default useAPI