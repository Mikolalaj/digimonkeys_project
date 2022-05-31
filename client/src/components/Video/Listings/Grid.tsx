import { IVideoProps } from '../Video';
import Video from '../Video';

export interface IGridProps {
    dataVideos: IVideoProps[];
    refresh: () => void;
}

export default function Grid ({ dataVideos, refresh }: IGridProps) {

    return (
    <>
        {dataVideos.map((video: IVideoProps) => <Video key={video.id} {...video} refresh={refresh} listing='grid'/>)}
    </>
    );
}
