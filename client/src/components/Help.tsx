import { UncontrolledTooltip } from 'reactstrap';
import { useRef } from 'react';
import { IoHelpCircleOutline } from 'react-icons/io5';

import videoApps from '../VideoApps';

export default function Help () {
    const ref = useRef(null)

    return (
    <div>
        <p ref={ref}><IoHelpCircleOutline /></p>
        <UncontrolledTooltip style={{textAlign: 'left'}} target={ref}>
            We support links from:
            <ul>
                {videoApps.map(app => (
                    <li key={app.name}>{app.name}</li>
                ))}
            </ul>
            You can paste an URL or video ID from any of these apps.
        </UncontrolledTooltip>
    </div>
    );
}
