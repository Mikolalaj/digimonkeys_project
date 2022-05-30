import { Container, Row } from 'reactstrap';
import { useState, useEffect } from 'react';
import { NewtonsCradle } from '@uiball/loaders'

import useAPI from '../../hooks/useAPI';
import Video from './Video';
import Pagination from './Pagination';
import ListingFilters from './ListingFilters';
import './ListingGrid.scss'

export interface IListingGridProps {
    setRefreshVideos: (refreshVideos: () => void) => void;
}

export default function ListingGrid ({ setRefreshVideos }: IListingGridProps) {
    const pageLimit = 6;
    const [sorting, setSorting] = useState<'asc' | 'desc'>('desc');
    const [liked, setLiked] = useState<boolean>(false);
    
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);

    const { state: stateInfo, refresh: refreshInfo } = useAPI('get', '/videos/info')

    const { state, setParams, refresh } = useAPI('get', '/videos/', [], {
        sort: sorting,
        limit: pageLimit,
        skip: 0,
        liked: liked
    })

    useEffect(() => {
        setRefreshVideos(() => () => {
            refreshInfo();
            refresh();
        })
    }, [])

    useEffect(() => {
        if (stateInfo.isSuccess) {
            setPageCount(Math.ceil(stateInfo.data.count / pageLimit))
        }
    }, [stateInfo])

    function onChangePage(newPage: number) {
        setPage(newPage);
        setParams({
            sort: sorting,
            limit: pageLimit,
            skip: (newPage-1) * pageLimit,
            liked: liked
        });
        refresh();
    }

    function onChangeSort(e: any) {
        setPage(1);
        setSorting(e.target.value);
        setParams({
            sort: e.target.value,
            limit: pageLimit,
            skip: 0,
            liked: liked
        });
        refresh();
    }

    function onChangeLiked(e: any) {
        if (e.target.checked) {
            setPageCount(Math.ceil(stateInfo.data.countliked / pageLimit))
        }
        else {
            setPageCount(Math.ceil(stateInfo.data.count / pageLimit))
        }
        setPage(1);
        setLiked(e.target.checked);
        setParams({
            sort: sorting,
            limit: pageLimit,
            skip: 0,
            liked: e.target.checked
        });
        refresh();
    }

    return (
    <div className='video-listing'>
        <h3>Your saved videos</h3>
        <ListingFilters sorting={sorting} liked={liked} onChangeSort={onChangeSort} onChangeLiked={onChangeLiked} />
        <Container >
        {state.isLoading && <div className='loading-wrapper'><NewtonsCradle size={55} color='var(--bs-teal)'/></div>}
            <Row className={state.isLoading ? 'hidden' : ''} >
                {state.data.map((video: any) => <Video key={video.id} {...video} refresh={() => {refreshInfo(); refresh();}}/>)}
            </Row>
        </Container>
        <Pagination onChangePage={onChangePage} page={page} pageCount={pageCount} />
    </div>
    );
}
