import { FormGroup, InputGroup, FormFeedback, Label, Input } from 'reactstrap';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { InputProps, InputType } from 'reactstrap/types/lib/Input';
import { UseControllerProps } from 'react-hook-form';
import './ControlledInput.css';

export interface IControlledInputProps extends Omit<InputProps, keyof ControllerRenderProps>   {
    label: string;
    name: string;
    type: InputType;
    control: any;
    errors: any;
    rules: UseControllerProps['rules'];
}

function ControlledInput ({ label, name, type, control, errors, rules, ...inputProps }: IControlledInputProps) {
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
                    {...inputProps}
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

export interface IControlledInputButtonProps extends IControlledInputProps   {
    button: React.ReactNode;
}

function ControlledInputButton({ label, name, type, control, errors, rules, button, ...inputProps }: IControlledInputButtonProps) {
    return (
    <FormGroup>
        <InputGroup>
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
                        {...inputProps}
                    />
                )}
            />
            {button}
        </InputGroup>
        <FormFeedback className={errors[name] && `d-block`}>
            {errors[name]?.message}
        </FormFeedback>
    </FormGroup>
    )
}

export default ControlledInput
export { ControlledInputButton }