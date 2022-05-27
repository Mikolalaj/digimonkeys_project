import { Col } from "reactstrap";
import { MdPerson, MdThumbUp } from 'react-icons/md';
import HeartButton from "./common/HeartButton";
import { useState } from "react";
import './Video.scss'

export interface IVideoProps {
    thumbnail: string;
    title: string;
    viewCount: number;
    likeCount: number;
    addDate: string;
    liked: boolean;
}

export default function Video ({thumbnail, title, viewCount, likeCount, addDate, liked}: IVideoProps) {
    const [isFavourite, setIsFavourite] = useState(liked);

    return (
    <Col xs={12} sm={6} md={4} lg={4}>
        <div className='video-listing-item'>
            <div className='thumbnail'>
                <img src={thumbnail} alt={title} />
            </div>
            <div className='title'>
                <h4>{title}</h4>
            </div>
            <div className='stats'>
                <div><MdPerson />{viewCount}</div>
                <div><MdThumbUp />{likeCount}</div>
                <HeartButton onClick={() => setIsFavourite(!isFavourite)} value={isFavourite} />

            </div>
            <p className='add-date'>{addDate}</p>
        </div>
    </Col>
    );
}
