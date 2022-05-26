import { useContext, useMemo } from 'react';
import { Form } from 'reactstrap';
import { useForm } from 'react-hook-form';

import VideoLinkInput from '../components/VideoLinkInput';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

type Input = {
    videoUrl: string
}

export default function Dashboard () {
    const { getFirstName } = useContext(AuthContext);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<Input>()

    function onClickAddVideo(formData: Input) {
        console.log(formData);
        reset();
    }

    const greeting = useMemo(() => {
        var today = new Date();
        var time = today.getHours()
        if (time > 18 || time < 5) {
            return 'Good evening';
        }
        else if (time > 12) {
            return 'Good afternoon';
        }
        else {
            return 'Good morning';
        }
    }, []);
    
    return (
    <div className='page-content'>
        <h1>{greeting} {getFirstName()}!</h1>
        <Form className='add-video-form' inline onSubmit={handleSubmit(onClickAddVideo)}>
            <h3>Add your video here!</h3>
            <VideoLinkInput
                label='Video URL'
                name='videoUrl'
                type='text'
                rules={{ required: { value:true, message: 'We need your video\'s URL!' } }}
                control={control}
                errors={errors}
            />
        </Form>
    </div>
    );
}
