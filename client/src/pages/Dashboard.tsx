import { useContext, useMemo, useState } from 'react';
import Listing from '../components/Video/Listings/Listing';
import LinkInput from '../components/Video/LinkInput';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard () {
    const { getFirstName } = useContext(AuthContext);
    const [refreshVideos, setRefreshVideos] = useState<() => void>(() => () => {});

    const greeting = useMemo(() => {
        var today = new Date();
        var time = today.getHours()
        if (time > 18 || time < 5) {
            return 'Good evening';
        }
        else if (time > 12) {
            return 'Good afternoon';
        }
        else {
            return 'Good morning';
        }
    }, []);
    
    return (
    <div className='page-content'>
        <h1>{greeting} {getFirstName()}!</h1>
        <LinkInput refreshVideos={refreshVideos} />
        <Listing setRefreshVideos={setRefreshVideos} />
    </div>
    );
}
