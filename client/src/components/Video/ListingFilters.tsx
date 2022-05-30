import { Input, Label, FormGroup } from 'reactstrap';
import { MdViewList, MdViewModule, MdDeleteForever, MdOutlineFileDownload } from 'react-icons/md';
import { useState } from 'react';

import './ListingFilters.scss';

export interface IListingFiltersProps {
    sorting: 'asc' | 'desc';
    liked: boolean;
    onChangeLiked: (e: any) => void;
    onChangeSort: (e: any) => void;
}

export default function ListingFilters ({ sorting, liked, onChangeLiked, onChangeSort }: IListingFiltersProps) {
    
    const [selectedListing, setSelectedListing] = useState<'list' | 'grid'>('grid');

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
            <div className='icon-button remove-all'><MdDeleteForever />Remove all</div>
            <div className='icon-button load-demo'><MdOutlineFileDownload />Load demo</div>
        </div>
    );
}
