import { FaYoutube } from 'react-icons/fa';
import { IconType } from 'react-icons';

type videoAppsType = {
    name: string;
    icon: IconType;
    url: string;
    videoUrl: string;
    color: string;
    regex: {
            url: RegExp;
            id: RegExp;
    }
}[]

const videoApps: videoAppsType = [
    {
        name: 'YouTube',
        icon: FaYoutube,
        url: 'https://www.youtube.com/',
        videoUrl: 'https://www.youtube.com/watch?v=',
        color: '#ff0000',
        regex: {
            url: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?/]{11})/,
            id: /([^#&?/]{11})/
        }
    },
    // {
    //     name: 'Vimeo',
    //     icon: FaVimeo,
    //     url: 'https://vimeo.com/',
    //     videoUrl: 'https://vimeo.com/',
    //     color: '#86c9ef',
    //     regex: {
    //         url: /(https:\/\/vimeo.com\/)([0-9]{9,12})/,
    //         id: /([0-9]{9,12})/
    //     }
    // }
]

export default videoApps;