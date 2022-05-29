import { FormGroup, InputGroup, InputGroupText, FormFeedback, Form, Input, Button } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

import videoApps from '../../VideoApps';
import HeartButton from '../common/HeartButton';
import Help from '../Help';
import './LinkInput.scss'

type InputType = {
    videoUrl: string
}

type validateInputType = {
    videoId: string;
    serviceName: string;
}

function validateUrl(input: string): validateInputType | false {
    if (input != undefined || input != '') {
        for (const app of videoApps) {
            let match = input.match(app.regex.url);
            if (match) {
                return {
                    videoId: match[match.length-1],
                    serviceName: app.name
                }
            }
            match = input.match(app.regex.id);
            if (match) {
                return {
                    videoId: match[match.length-1],
                    serviceName: app.name
                }
            }
        }
    }
    return false;
}

function ControlledLinkInput() {
    const [isLiked, setIsLiked] = useState(false);

    const { handleSubmit, reset, setError, control, formState: { errors } } = useForm<InputType>()

    function onClickAddVideo(formData: InputType) {
        const result = validateUrl(formData.videoUrl);

        if (!result) {
            setError('videoUrl', {
                type: 'custom',
                message: 'Invalid URL link (' + videoApps.map((app => app.name)) + ')'
            })
            return;
        }
        console.log(result);

        reset();
    }

    return (
    <Form className='add-video-form' inline onSubmit={handleSubmit(onClickAddVideo)}>
        <h3>Add your video here!</h3>
        <FormGroup className='video-link-input'>
            <InputGroup>
                <Controller
                    name='videoUrl'
                    control={control}
                    defaultValue={''}
                    rules={{ required: { value:true, message: 'We need your video\'s URL!' } }}
                    render={({ field }) => (
                        <Input
                            invalid={!!errors['videoUrl']?.message}
                            type='text'
                            id='videoUrl'
                            placeholder='Video URL'
                            style={{borderRightColor: 'transparent'}}
                            {...field}
                        />
                    )}
                />
                <InputGroupText className={errors['videoUrl'] && `error`}>
                    <HeartButton value={isLiked} onClick={() => {console.log(isLiked); setIsLiked(!isLiked)}} />
                </InputGroupText>
                <InputGroupText className={errors['videoUrl'] && `error`}>
                    <Help />
                </InputGroupText>
                <Button color='primary'>Add</Button>
            </InputGroup>
            <FormFeedback className={errors['videoUrl'] && `d-block`}>
                {errors['videoUrl']?.message}
            </FormFeedback>
        </FormGroup>
    </Form>
    )
}

export default ControlledLinkInput
