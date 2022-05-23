import { FormGroup, Label, Input } from 'reactstrap';
import { Controller } from 'react-hook-form';
import { InputType } from 'reactstrap/types/lib/Input';

export interface IControlledInputProps {
    label: string;
    type: InputType;
    control: any;
}

export default function ControlledInput ({ label, type, control }: IControlledInputProps) {
  return (
    <>
    <FormGroup floating>
        <Controller
            name={label.toLowerCase()}
            control={control}
            defaultValue={''}
            render={({ field }) => <Input type={type} id={label} placeholder={label} {...field} />}
        />
        <Label for={label}>{label}</Label>
    </FormGroup>
    </>
  );
}
