import { FormGroup, Label, Input } from 'reactstrap';
import { Controller } from 'react-hook-form';
import { InputType } from 'reactstrap/types/lib/Input';
import ErrorMessage from './ErrorMessage';
import './ControlledInput.css';

export interface IControlledInputProps {
    label: string;
    type: InputType;
    control: any;
    errors: any;
}

export default function ControlledInput ({ label, type, control, errors }: IControlledInputProps) {
    return (
    <>
    <FormGroup floating>
        <Controller
            name={label.toLowerCase()}
            control={control}
            defaultValue={''}
            rules={{ required: { value:true, message: 'To pole jest wymagane' } }}
            render={({ field }) => <Input type={type} id={label} placeholder={label} {...field} />}
        />
        <Label for={label}>{label}</Label>
    </FormGroup>
    <ErrorMessage message={errors[label.toLowerCase()]?.message} size='sm' />
    </>
    );
}
