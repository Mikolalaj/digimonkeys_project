import { Button, Form } from 'reactstrap';
import ControlledInput from '../components/common/ControlledInput';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { publicFetch } from '../utils/fetch';
import { AxiosError } from 'axios';
import ErrorMessage from '../components/common/ErrorMessage';
import './Login.css'

type Inputs = {
    username: string,
    password: string,
};

export default function Login (): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const { handleSubmit, control, formState: { errors } } = useForm<Inputs>({'defaultValues': { username: '', password: '' }});

    async function onClickLogin(formData: Inputs) {
        try {
            const { data } = await publicFetch.post('users/auth', formData);
            authContext.setAuthState(data);
            navigate('/dashboard');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response!.data.message);
                setErrorMessage(error.response!.data.message)
            } else {
                throw error;
            }
        }
    }

    return (
    authContext.isAuthenticated() ? <Navigate to='/dashboard' /> :
    <div className='login-box'>
        <Form inline className='form' onSubmit={handleSubmit(onClickLogin)}>
            <h2>Log In</h2>
            <ErrorMessage message={errorMessage} size='md'/>
            <ControlledInput label='Username' type='text' control={control} errors={errors} />
            <ControlledInput label='Password' type='password' control={control} errors={errors} />
            <p>Don't have an account yet? Register <u>here</u></p>
            <Button className='button'>Submit</Button>
        </Form>
    </div>
    );
}
