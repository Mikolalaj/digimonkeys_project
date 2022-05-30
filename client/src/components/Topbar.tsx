import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { MdOutlineLocalMovies } from 'react-icons/md';
import { useContext } from 'react';

export interface ITopbarProps {
}

export default function Topbar (props: ITopbarProps) {
    const authContext = useContext(AuthContext);

    return (
    <Navbar color="light" expand="md" light>
        <NavbarBrand><MdOutlineLocalMovies />Video Library</NavbarBrand>
        <Button onClick={() => authContext.logout()}>Logout</Button>
    </Navbar>
    );
}
