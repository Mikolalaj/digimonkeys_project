import { IVideoProps } from '../Video';
import Video from '../Video';

export interface IGridProps {
    dataVideos: IVideoProps[];
}

export default function Grid ({ dataVideos }: IGridProps) {

    return (
    <>
        {dataVideos.map((video: IVideoProps) => <Video key={video.id} {...video} listing='grid'/>)}
    </>
    );
}
