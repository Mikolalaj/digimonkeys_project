import { FormGroup, InputGroup, InputGroupText, FormFeedback, Input, Button } from 'reactstrap';
import { Controller } from 'react-hook-form';

import HeartButton from './common/HeartButton';
import Help from './Help';
import { IControlledInputProps } from './common/ControlledInput';
import './VideoLinkInput.css'

function ControlledLinkInput({ label, name, type, control, errors, rules, ...inputProps }: IControlledInputProps) {

    return (
    <FormGroup className='video-link-input'>
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
                        style={{borderRightColor: 'transparent'}}
                        {...field}
                        {...inputProps}
                    />
                )}
            />
            <InputGroupText>
                <Help />
            </InputGroupText>
            <InputGroupText>
                <HeartButton />
            </InputGroupText>
            <Button color='primary'>Add</Button>
        </InputGroup>
        <FormFeedback className={errors[name] && `d-block`}>
            {errors[name]?.message}
        </FormFeedback>
    </FormGroup>
    )
}

export default ControlledLinkInput
