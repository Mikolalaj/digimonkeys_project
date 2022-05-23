import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import ControlledInput from '../components/common/ControlledInput';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { publicFetch } from '../utils/fetch';
import './Login.css'

export interface ILoginProps {
}

type Inputs = {
    login: string,
    password: string,
};

export default function Login (props: ILoginProps): JSX.Element {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const { handleSubmit, control, formState: { errors } } = useForm<Inputs>({'defaultValues': { login: '', password: '' }});

    async function onClickLogin(formData: Inputs) {
        console.log(formData);
        try {
            const { data } = await publicFetch.post('users/auth', formData);
            authContext.setAuthState(data);
            navigate('/dashboard');
        } catch ({ response: {data: {message}} }) {
            console.log(message)
        }
    }

    return (
    <div className='login-box'>
        <Form inline className='form' onSubmit={handleSubmit(onClickLogin)}>
            <h2>Sign In</h2>
            <ControlledInput label='login' type='text' control={control} />
            <ControlledInput label='password' type='password' control={control} />
            <Button className='button'>Submit</Button>
        </Form>
    </div>
    );
}
