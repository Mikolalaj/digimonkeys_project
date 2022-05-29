import { Col } from "reactstrap";
import { MdPerson, MdThumbUp, MdDelete } from 'react-icons/md';
import { useState } from "react";

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

export default function Video ({thumbnail, title, viewCount, likeCount, addDate, liked, urlId, serviceName}: IVideoProps) {
    const [isFavourite, setIsFavourite] = useState(liked);

    function createVideoLink(): string {
        for (const app of videoApps) {
            if (app.name === serviceName) {
                return app.videoUrl + urlId;
            }
        }
        return ''
    }

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
                <HeartButton onClick={() => setIsFavourite(!isFavourite)} value={isFavourite} />
                <MdDelete className='delete'/>
            </div>
            <p className='add-date'>{addDate}</p>
        </div>
    </Col>
    );
}
