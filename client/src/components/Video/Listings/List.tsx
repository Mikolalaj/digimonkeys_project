import { IVideoProps } from '../Video';
import Video from '../Video';

export interface IListProps {
    dataVideos: IVideoProps[];
}

export default function List ({ dataVideos }: IListProps) {
    
    return (
    <>
        {dataVideos.map((video: IVideoProps) => <Video key={video.id} {...video} listing='list'/>)}
    </>
    );
}
