import videoApps from '../VideoApps';
import './SupportedApps.scss';

export default function SupportedApps () {

    return (
    <div className='supported-sites'>
        <h5>Our app supports now</h5>
        <div className='icons'>
            {videoApps.map((app, index) => <app.icon key={index} onClick={() => window.open(app.url)} style={{ color: app.color }}/> )}
        </div>
        <p>More to come soon...</p>
    </div>
    );
}
