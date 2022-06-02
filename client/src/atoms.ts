import { atom } from 'recoil';

const videosState = atom<(newPageNumber?: number) => void>({
    key: 'videosState', // unique ID (with respect to other atoms/selectors)
    default: () => {} // default value
});

export default videosState;