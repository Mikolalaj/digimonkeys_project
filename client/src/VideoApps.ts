import { FaYoutube, FaVimeo } from 'react-icons/fa';
import { IconType } from 'react-icons';

type videoAppsType = {
    name: string;
    icon: IconType;
    url: string;
    color: string;
}[]

const videoApps: videoAppsType = [
    {
        name: 'Youtube',
        icon: FaYoutube,
        url: 'https://www.youtube.com/',
        color: '#ff0000'
    },
    {
        name: 'Vimeo',
        icon: FaVimeo,
        url: 'https://vimeo.com/',
        color: '#86c9ef'
    }
]

export default videoApps;