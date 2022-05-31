import { IVideoProps } from '../Video';
import Video from '../Video';

export interface IListProps {
    dataVideos: IVideoProps[];
    refresh: () => void;
}

export default function List ({ dataVideos, refresh }: IListProps) {
    
    return (
    <>
        {dataVideos.map((video: IVideoProps) => <Video key={video.id} {...video} refresh={refresh} listing='list'/>)}
    </>
    );
}
