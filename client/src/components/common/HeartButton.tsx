import { useState } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import './HeartButton.css';

export interface IHeartButtonProps {
}

export default function HeartButton (props: IHeartButtonProps) {
    const [isFavourite, setIsFavourite] = useState(false);

    return (
    <div>
        {isFavourite ?
            <IoMdHeart onClick={() => setIsFavourite(!isFavourite)} className='heart-button liked' /> :
            <IoMdHeartEmpty onClick={() => setIsFavourite(!isFavourite)} className='heart-button unliked' />
        }
    </div>
    );
}
