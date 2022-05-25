import { AuthContext } from '../../context/AuthContext';
import ControlledInput from '../../components/common/ControlledInput';
import ErrorMessage from '../../components/common/ErrorMessage';
import TextLink from '../../components/common/TextLink';
import { publicFetch } from '../../utils/fetch';

import { Button, Form } from 'reactstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

type Inputs = {
    username: string,
    password: string,
};

export default function LoginForm () {
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
    <Form inline className='form' onSubmit={handleSubmit(onClickLogin)}>
        <h2>Log In</h2>
        <ErrorMessage message={errorMessage} size='md'/>
        <ControlledInput
            label='Username'
            name='username'
            type='text'
            rules={{ required: { value:true, message: 'Username is required' } }}
            control={control}
            errors={errors}
        />
        <ControlledInput
            label='Password'
            name='password'
            type='password'
            rules={{ required: { value:true, message: 'Password is required' } }}
            control={control}
            errors={errors}
        />
        <p>Don't have an account yet? Register <TextLink href={'/register'}>here</TextLink></p>
        <Button color='primary'>Submit</Button>
    </Form>
    );
}
