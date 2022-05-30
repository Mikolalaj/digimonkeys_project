import { Col } from "reactstrap";
import { MdPerson, MdThumbUp, MdDelete } from 'react-icons/md';
import { useEffect, useState } from "react";

import useAPI from "../../hooks/useAPI";
import videoApps from "../../VideoApps";
import HeartButton from "../common/HeartButton";
import './Video.scss'

export interface IVideoProps {
    thumbnail: string;
    title: string;
    viewCount: number;
    likeCount: number;
    addDate: string;
    liked: boolean;
    urlId: string;
    serviceName: string;
    id: string;
    refresh: () => void;
}

function shortenNumber(num: number) {
    if (num < 1000) {
        return num;
    }
    if (num < 1000000) {
        return Math.round((num/1000)*10)/10 + 'K';
    }
    if (num < 1000000000) {
        return Math.round((num/1000000)*10)/10 + 'M';
    }
    return Math.round((num/1000000000)*10)/10 + 'B';
}

export default function Video (props: IVideoProps) {
    const {thumbnail, title, viewCount, likeCount, addDate, liked, urlId, serviceName, id, refresh} = props;

    const [isFavourite, setIsFavourite] = useState(liked);

    function createVideoLink(): string {
        for (const app of videoApps) {
            if (app.name === serviceName) {
                return app.videoUrl + urlId;
            }
        }
        return ''
    }

    const {state: stateDelete, setRequestData: setDeleteRequestData, setIsReady: setIsReadyDelete} = useAPI('delete', '/videos', {}, {}, false);

    function deleteVideo() {
        setDeleteRequestData({
            videoId: id,
        });
        setIsReadyDelete(true);
    }

    useEffect(() => {
        if (stateDelete.isSuccess) {
            refresh();
        }
        else if (stateDelete.isError) {
            console.log(stateDelete.errorMessage)
        }
    }, [stateDelete]);

    const {state, setRequestData, setIsReady} = useAPI('patch', '/videos/favourite', {}, {}, false);

    function changeFavourite() {
        setIsFavourite(!isFavourite)
        setRequestData({
            videoId: id,
            liked: !isFavourite
        });
        setIsReady(true);
    }

    useEffect(() => {
        if (state.isSuccess) {
            console.log(state.data.message);
        }
        else if (state.isError) {
            setIsFavourite(!isFavourite)
            console.log(state.errorMessage)
        }
    }, [state]);

    return (
    <Col xs={12} sm={6} md={4} lg={4}>
        <div className='video-listing-item'>
            <div className='thumbnail' onClick={() => window.open(createVideoLink(), '_blank')}>
                <img src={thumbnail} alt={title} />
            </div>
            <div className='title'>
                <h4>{title}</h4>
            </div>
            <div className='stats'>
                <div><MdPerson />{shortenNumber(viewCount)}</div>
                <div><MdThumbUp />{shortenNumber(likeCount)}</div>
                <HeartButton onClick={changeFavourite} value={isFavourite} />
                <MdDelete className='delete' onClick={deleteVideo}/>
            </div>
            <p className='add-date'>{addDate}</p>
        </div>
    </Col>
    );
}
