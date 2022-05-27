import { Container, Row } from 'reactstrap';
import { useState, useEffect } from 'react';

import useAPI from '../../hooks/useAPI';
import Video from './Video';
import Pagination from './Pagination';
import ListingFilters from './ListingFilters';
import './Listing.css'

export default function Listing () {
    const pageLimit = 6;
    const [sorting, setSorting] = useState<'asc' | 'desc'>('asc');
    const [liked, setLiked] = useState<boolean>(false);
    
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);

    const [stateInfo] = useAPI('get', '/videos/info')

    const [state,,,setParams,, refresh] = useAPI('get', '/videos/', [], {
        sort: sorting,
        limit: pageLimit,
        skip: 0,
        liked: liked
    })

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
        <Container>
            <Row>
                {state.data.map((video: any) => <Video key={video.id} {...video} />)}
            </Row>
        </Container>
        <Pagination onChangePage={onChangePage} page={page} pageCount={pageCount} />
    </div>
    );
}
