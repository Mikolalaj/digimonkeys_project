import { FaYoutube, FaVimeo } from 'react-icons/fa';
import { IconType } from 'react-icons';

type videoAppsType = {
    name: string;
    icon: IconType;
    url: string;
    videoUrl: string;
    color: string;
}[]

const videoApps: videoAppsType = [
    {
        name: 'YouTube',
        icon: FaYoutube,
        url: 'https://www.youtube.com/',
        videoUrl: 'https://www.youtube.com/watch?v=',
        color: '#ff0000',
    },
    {
        name: 'Vimeo',
        icon: FaVimeo,
        url: 'https://vimeo.com/',
        videoUrl: 'https://vimeo.com/',
        color: '#86c9ef',
    }
]

export default videoApps;