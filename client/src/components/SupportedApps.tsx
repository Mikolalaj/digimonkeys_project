import { FaYoutube, FaVimeo } from 'react-icons/fa';
import { IconType } from 'react-icons';
import './SupportedApps.css';

export default function SupportedApps () {
    
    type supportedAppsType = {
        name: string;
        icon: IconType;
        url: string;
        color: string;
    }[]

    const supportedApps: supportedAppsType = [
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

    return (
    <div className='supported-sites'>
        <h5>Our app supports now</h5>
        <div className='icons'>
            {supportedApps.map(app => <app.icon onClick={() => window.open(app.url)} style={{ color: app.color }}/> )}
        </div>
        <p>More to come soon...</p>
    </div>
    );
}
