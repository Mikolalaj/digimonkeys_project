import { Input, Label, FormGroup, Container, Row, Col } from 'reactstrap';
import { MdViewList, MdViewModule, MdDeleteForever, MdOutlineFileDownload, MdPerson, MdThumbUp } from 'react-icons/md';
import { useState, useEffect } from 'react';
import useAPI from '../hooks/useAPI';
import './VideoListing.css'

export default function VideoListing () {
    const [sorting, setSorting] = useState<string>('asc');
    const [liked, setLiked] = useState<boolean>(false);

    const [state,,,setParams,, refresh] = useAPI('get', '/videos/', [], {
        sort: sorting,
        limit: 6,
        skip: 0,
        liked: liked
    });

    useEffect(() => {
        if (state.isSuccess) {
            console.log(state.data);
        }
    }, [state])

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
                {state.data.map((video: any) => {
                    return (
                    <Col key={video.id} xs={12} sm={6} md={4} lg={4}>
                        <div className='video-listing-item'>
                            <div className='thumbnail'>
                                <img src={video.videoData.thumbnail} alt={video.videoData.title} />
                            </div>
                            <div className='title'>
                                <h4>{video.videoData.title}</h4>
                            </div>
                            <div className='stats'>
                                <div><MdPerson />{video.videoData.viewCount}</div>
                                <div><MdThumbUp />{video.videoData.likeCount}</div>
                            </div>
                            <p className='add-date'>{video.addDate}</p>
                        </div>
                    </Col>
                    )
                })}
            </Row>
        </Container>
        </div>
        <div className='pagination'>

        </div>
    </div>
    );
}
