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
    firstName: string,
    username: string,
    password: string,
    repeatPassword: string
};

export default function RegisterForm () {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, getValues, formState: { errors } } = useForm<Inputs>();

    async function onClickRegister(formData: Inputs) {
        try {
            const { data } = await publicFetch.post('users/signup', formData);
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
    <Form inline className='form' onSubmit={handleSubmit(onClickRegister)}>
        <h2>Register</h2>
        <ErrorMessage message={errorMessage} size='md'/>
        <ControlledInput
            label='First Name'
            name='firstName'
            type='text'
            rules={{ required: { value:true, message: 'First Name is required' } }}
            control={control}
            errors={errors}
        />
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
            rules={{ required: { value: true, message: 'Password is required' },
                        minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
            control={control}
            errors={errors}
        />
        <ControlledInput
            label='Repeat Password'
            name='repeatPassword'
            type='password'
            rules={{ required: { value:true, message: 'Password is required' },
                        validate: (value) => value === getValues('password') || 'Passwords do not match' }}
            control={control}
            errors={errors}
        />
        <p>Have an account already? Sign in <TextLink href={'/login'}>here</TextLink></p>
        <Button color='primary'>Register</Button>
    </Form>
    );
}
