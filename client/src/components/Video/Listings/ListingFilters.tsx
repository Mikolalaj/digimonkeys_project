import { Input, Label, FormGroup } from 'reactstrap';
import { MdViewList, MdViewModule, MdDeleteForever, MdOutlineFileDownload } from 'react-icons/md';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import useAPI from '../../../hooks/useAPI';
import videosState from '../../../atoms';
import './ListingFilters.scss';

export interface IListingFiltersProps {
    sorting: 'asc' | 'desc';
    liked: boolean;
    onChangeLiked: (e: any) => void;
    onChangeSort: (e: any) => void;
    setSelectedListing: (listing: 'grid' | 'list') => void;
    selectedListing: 'grid' | 'list';
}

export default function ListingFilters (props: IListingFiltersProps) {
    const { sorting, liked, onChangeLiked, onChangeSort, setSelectedListing, selectedListing } = props;
    
    const [refreshVideos] = useRecoilState(videosState);

    const {state: stateDelete, setIsReady: setIsReadyDelete} = useAPI('delete', '/videos/all', {}, {}, false);

    function deleteAll() {
        setIsReadyDelete(true);
    }

    useEffect(() => {
        if (stateDelete.isSuccess) {
            refreshVideos();
        }
        else if (stateDelete.isError) {
            console.log(stateDelete.errorMessage)
        }
    }, [stateDelete]);

    const {state: stateDemo, setIsReady: setIsReadyDemo} = useAPI('post', '/videos/demo', {}, {}, false);

    function loadDemo() {
        setIsReadyDemo(true);
    }

    useEffect(() => {
        if (stateDemo.isSuccess) {
            refreshVideos();
        }
        else if (stateDemo.isError) {
            console.log(stateDemo.errorMessage)
        }
    }, [stateDemo]);

    return (
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
                    Only favorited
                </Label>
            </FormGroup>
            <div className='icon-button remove-all' onClick={deleteAll}><MdDeleteForever />Remove all</div>
            <div className='icon-button load-demo' onClick={loadDemo}><MdOutlineFileDownload />Load demo</div>
        </div>
    );
}
