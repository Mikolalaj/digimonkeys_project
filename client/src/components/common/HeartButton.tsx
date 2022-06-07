import { useState, useEffect } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import './HeartButton.scss';

export interface IHeartButtonProps {
    value: boolean;
    onClick: () => void;
}

export default function HeartButton ({ value, onClick }: IHeartButtonProps) {
    const [isFavourite, setIsFavourite] = useState(value);

    useEffect(() => {
        setIsFavourite(value);
    }, [value])

    return (
    <div className='heart-button-wrapper'>
        {isFavourite ?
            <IoMdHeart onClick={onClick} className='heart-button liked' /> :
            <IoMdHeartEmpty onClick={onClick} className='heart-button unliked' />
        }
    </div>
    );
}
