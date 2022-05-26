import { useContext, useMemo } from 'react';
import { Form, Button, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { ControlledInputButton } from '../components/common/ControlledInput';
import { AuthContext } from '../context/AuthContext';
import HeartButton from '../components/common/HeartButton';
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
            <Row className='add-video'>
                <Col md={11}>
                    <ControlledInputButton
                        label='Video URL'
                        name='videoUrl'
                        type='text'
                        rules={{ required: { value:true, message: 'You need your video\'s URL!' } }}
                        control={control}
                        errors={errors}
                        button={<Button color='primary'>Add</Button>}
                    />
                </Col>
                <Col md={1}>
                    <HeartButton />
                </Col>
            </Row>            
        </Form>
    </div>
    );
}
