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
    const [, setRefreshVideos] = useRecoilState(videosState);

    const pageLimit = 6;
    const [sorting, setSorting] = useState<'asc' | 'desc'>('desc');
    const [liked, setLiked] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedListing, setSelectedListing] = useState<'list' | 'grid'>('grid');

    const { state: stateInfo, refresh: refreshInfo } = useAPI('get', '/videos/info')

    const { state: stateVideos, setParams: setParamsVideos, refresh: refreshVideos } = useAPI('get', '/videos/', [], {
        sort: sorting,
        limit: pageLimit,
        skip: 0,
        liked: liked
    })

    useEffect(() => {
        setRefreshVideos(() => (newPageNumber=1) => {
            setParamsVideos({
                sort: sorting,
                skip: (newPageNumber-1) * pageLimit,
                liked: liked,
                limit: pageLimit,
            });
            refreshInfo();
            refreshVideos();
            setCurrentPage(newPageNumber);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pageCount = useMemo(() => {
        if (stateInfo.isSuccess) {
            if (liked) {
                return Math.ceil(stateInfo.data.countliked / pageLimit)
            }
            else {
                return Math.ceil(stateInfo.data.count / pageLimit)
            }
        }
        return 1;
    }, [stateInfo, liked])

    function refresh(newPageNumber=1) {
        refreshInfo();
        refreshVideos();
        setCurrentPage(newPageNumber);
    }

    function onChangePage(newPageNumber: number) {
        setParamsVideos({
            sort: sorting,
            skip: (newPageNumber-1) * pageLimit,
            liked: liked,
            limit: pageLimit,
        });
        refresh(newPageNumber);
    }

    function onChangeSort(event: React.ChangeEvent<HTMLSelectElement>) {
        setSorting(event.target.value as 'asc' | 'desc');
        setParamsVideos({
            sort: event.target.value,
            skip: 0,
            liked: liked,
            limit: pageLimit
        });
        refresh();
    }

    function onChangeLiked(e: React.ChangeEvent<HTMLInputElement>) {
        setLiked(e.target.checked);
        setParamsVideos({
            sort: sorting,
            skip: 0,
            liked: e.target.checked,
            limit: pageLimit
        });
        refresh();
    }

    return (
    <div className='video-listing'>
        <h3>Your saved videos</h3>
        <ListingFilters
            sorting={sorting}
            liked={liked}
            onChangeSort={onChangeSort}
            onChangeLiked={onChangeLiked}
            selectedListing={selectedListing}
            setSelectedListing={setSelectedListing}
        />
        <Container >
        {stateVideos.isLoading && <div className='loading-wrapper'><NewtonsCradle size={55} color='var(--bs-teal)'/></div>}
        {(stateVideos.isSuccess && stateVideos.data.length === 0) && <p className='no-data'>You don't have any saved {liked && 'favourited'} videos yet 🙁</p>}
            <Row className={(stateVideos.isLoading || stateVideos.data.length === 0) ? 'hidden' : ''} >
                {selectedListing === 'grid' ?
                <Grid dataVideos={stateVideos.data} /> :
                <List dataVideos={stateVideos.data} />}
            </Row>
        </Container>
        {stateVideos.data.length !== 0 && <Pagination onChangePage={onChangePage} page={currentPage} pageCount={pageCount} />}
    </div>
    );
}
