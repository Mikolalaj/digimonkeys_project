import { Input, Label, FormGroup, Container, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { MdViewList, MdViewModule, MdDeleteForever, MdOutlineFileDownload } from 'react-icons/md';
import { useState, useEffect } from 'react';

import useAPI from '../hooks/useAPI';
import Video from './Video';
import './VideoListing.css'

export default function VideoListing () {
    const [sorting, setSorting] = useState<string>('asc');
    const [liked, setLiked] = useState<boolean>(false);

    const [stateInfo] = useAPI('get', '/videos/info')

    const [state,,,setParams,, refresh] = useAPI('get', '/videos/', [], {
        sort: sorting,
        limit: 6,
        skip: 0,
        liked: liked
    })

    useEffect(() => {
        if (stateInfo.isSuccess) {
            console.log(stateInfo.data);
        }
    }, [stateInfo])

    function onChangeSort(e: any) {
        setSorting(e.target.value);
        setParams({
            sort: e.target.value,
            limit: 6,
            skip: 0,
            liked: liked
        });
        refresh();
    }

    function onChangeLiked(e: any) {
        setLiked(e.target.checked);
        setParams({
            sort: sorting,
            limit: 6,
            skip: 0,
            liked: e.target.checked
        });
        refresh();
    }

    const [selectedListing, setSelectedListing] = useState<'list' | 'grid'>('list');

    return (
    <div className='video-listing'>
        <h3>Your saved videos</h3>
        <div className='listing-filters'>
            <div className='display'>
                <MdViewList className={selectedListing === 'list' ? 'selected': ''} onClick={() => setSelectedListing('list')} />
                <MdViewModule className={selectedListing === 'grid' ? 'selected': ''} onClick={() => setSelectedListing('grid')} />
            </div>
            <Input value={sorting} onChange={onChangeSort} type="select" placeholder='Sort by'>
                <option value='asc'>From oldest</option>
                <option value='desc'>From newest</option>
            </Input>
            <FormGroup check>
                <Input checked={liked} onChange={onChangeLiked} type='checkbox' />
                <Label check style={{marginBottom: 0}}>
                    Only liked
                </Label>
            </FormGroup>
            <div className='icon-button remove-all'><MdDeleteForever />Remove all</div>
            <div className='icon-button load-demo'><MdOutlineFileDownload />Load demo</div>
        </div>
        <div className='listing'>
        <Container>
            <Row>
                {state.data.map((video: any) => <Video {...video} />)}
            </Row>
        </Container>
        </div>
        <div className='pagination'>
        <Pagination aria-label="Page navigation example">
            <PaginationItem disabled>
                <PaginationLink
                href="#"
                previous
                />
            </PaginationItem>
            <PaginationItem active>
                <PaginationLink href="#">
                1
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                2
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                3
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                href="#"
                next
                />
            </PaginationItem>
        </Pagination>
        </div>
    </div>
    );
}
