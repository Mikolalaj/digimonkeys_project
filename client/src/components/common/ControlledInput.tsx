import * as React from 'react';
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
            render={({ field }) => <Input defaultValue='' type={type} id={label} placeholder={label} {...field} />}
        />
        <Label for={label}>{label}</Label>
    </FormGroup>
    </>
  );
}
