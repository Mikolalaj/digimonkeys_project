import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { Controller } from 'react-hook-form';
import { InputType } from 'reactstrap/types/lib/Input';
import { UseControllerProps } from 'react-hook-form';
import './ControlledInput.css';

export interface IControlledInputProps {
    label: string;
    name: string;
    type: InputType;
    control: any;
    errors: any;
    rules: UseControllerProps['rules'];
}

export default function ControlledInput ({ label, name, type, control, errors, rules }: IControlledInputProps) {
    return (
    <>
    <FormGroup floating>
        <Controller
            name={name}
            control={control}
            defaultValue={''}
            rules={rules}
            render={({ field }) => (
                <Input
                    invalid={!!errors[name]?.message}
                    type={type}
                    id={name}
                    placeholder={label}
                    {...field}
                />
            )}
        />
        <Label for={name}>{label}</Label>
        <FormFeedback>
            {errors[name]?.message}
        </FormFeedback>
    </FormGroup>
    </>
    );
}
