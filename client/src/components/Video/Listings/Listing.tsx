import { useEffect, useState, useMemo } from 'react';
import { Container, Row } from 'reactstrap';
import { NewtonsCradle } from '@uiball/loaders'
import { useRecoilState } from 'recoil';

import videosState from '../../../atoms';
import Pagination from './Pagination';
import useAPI from '../../../hooks/useAPI';
import ListingFilters from './ListingFilters';
import Grid from './Grid'
import List from './List'
import './Listing.scss'

export default function Listing () {
    const [refreshVideos, setRefreshVideos] = useRecoilState(videosState);

    const pageLimit = 6;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedListing, setSelectedListing] = useState<'list' | 'grid'>('grid');

    const { state: stateInfo, refresh: refreshInfo } = useAPI('get', { url: '/videos/info' })

    const { state: stateVideos, params: paramsVideos, setParams: setParamsVideos, refresh: refreshVideosData } = useAPI('get', {
        url: '/videos',
        resultData: [],
        params: {
            sort: 'desc',
            limit: pageLimit,
            skip: 0,
            liked: false
        }
    });

    function refresh(newPageNumber=1) {
        refreshInfo();
        refreshVideosData();
        setCurrentPage(newPageNumber);
    }

    useEffect(() => {
        setRefreshVideos(() => (newPageNumber=1) => {
            setParamsVideos({
                ...paramsVideos,
                skip: (newPageNumber-1) * pageLimit
            });
            refresh(newPageNumber);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pageCount = useMemo(() => {
        if (stateInfo.isSuccess) {
            if (paramsVideos!.liked) {
                return Math.ceil(stateInfo.data.countliked / pageLimit)
            }
            else {
                return Math.ceil(stateInfo.data.count / pageLimit)
            }
        }
        return 1;
    }, [stateInfo, paramsVideos!.liked])

    function onChangeSort(event: React.ChangeEvent<HTMLSelectElement>) {
        setParamsVideos({
            ...paramsVideos,
            sort: event.target.value,
            skip: 0
        });
        refresh();
    }

    function onChangeLiked(event: React.ChangeEvent<HTMLInputElement>) {
        setParamsVideos({
            ...paramsVideos,
            liked: event.target.checked,
            skip: 0
        });
        refresh();
    }

    return (
    <div className='video-listing'>
        <h3>Your saved videos</h3>
        <ListingFilters
            sorting={paramsVideos!.sorting}
            liked={paramsVideos!.liked}
            onChangeSort={onChangeSort}
            onChangeLiked={onChangeLiked}
            selectedListing={selectedListing}
            setSelectedListing={setSelectedListing}
        />
        <Container >
        {stateVideos.isLoading && <div className='loading-wrapper'><NewtonsCradle size={55} color='var(--bs-teal)'/></div>}
        {(stateVideos.isSuccess && stateVideos.data.length === 0) &&
        <p className='no-data'>You don't have any saved {paramsVideos!.liked && 'favourited'} videos yet ????</p>}
            <Row className={(stateVideos.isLoading || stateVideos.data.length === 0) ? 'hidden' : ''} >
                {selectedListing === 'grid' ?
                <Grid dataVideos={stateVideos.data} /> :
                <List dataVideos={stateVideos.data} />}
            </Row>
        </Container>
        {stateVideos.data.length !== 0 && <Pagination onChangePage={refreshVideos} page={currentPage} pageCount={pageCount} />}
    </div>
    );
}
