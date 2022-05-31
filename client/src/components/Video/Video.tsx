import { Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdPerson, MdThumbUp, MdDelete } from 'react-icons/md';
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player/lazy'

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
    listing: 'list' | 'grid';
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
    const {thumbnail, title, viewCount, likeCount, addDate, liked, urlId, serviceName, id, refresh, listing} = props;

    const [isOpenModal, setIsOpenModal] = useState(false);
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
    // eslint-disable-next-line
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
        if (state.isError) {
            setIsFavourite(!isFavourite)
            console.log(state.errorMessage)
        }
    }, [state, isFavourite]);

    return (
    <Col xs={12} sm={listing ==='grid' ? 6 : 12} md={listing ==='grid' ? 4 : 12} lg={listing ==='grid' ? 4 : 12}>
        <Modal size='lg' style={{maxWidth: '675px', width: '100%'}} isOpen={isOpenModal} centered toggle={() => setIsOpenModal(!isOpenModal)}>
            <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
                {title}
            </ModalHeader>
            <ModalBody>
                <ReactPlayer url={createVideoLink()} />
            </ModalBody>
        </Modal>
        <div className={`video-item ${listing}`}>
            <div className='thumbnail' onClick={() => setIsOpenModal(true)}>
                <img src={thumbnail} alt={title} />
            </div>
            {listing ==='grid' ? <>
            <div className='title' onClick={() => window.open(createVideoLink(), '_blank')}>
                <h4>{title}</h4>
            </div>
            <div className='stats'>
                <div><MdPerson />{shortenNumber(viewCount)}</div>
                <div><MdThumbUp />{shortenNumber(likeCount)}</div>
                <HeartButton onClick={changeFavourite} value={isFavourite} />
                <MdDelete className='delete' onClick={deleteVideo}/>
            </div>
            <p className='add-date'>{addDate}</p></> :
            
            <div className='list-info'>
                <div className='title' onClick={() => window.open(createVideoLink(), '_blank')}>
                    <h4>{title}</h4>
                </div>
                <div className='stats-date'>
                    <div className='stats'>
                        <div><MdPerson />{shortenNumber(viewCount)}</div>
                        <div><MdThumbUp />{shortenNumber(likeCount)}</div>
                        <HeartButton onClick={changeFavourite} value={isFavourite} />
                        <MdDelete className='delete' onClick={deleteVideo}/>
                    </div>
                    <p className='add-date'>{addDate}</p>
                </div>
            </div>
            }
        </div>
    </Col>
    );
}
