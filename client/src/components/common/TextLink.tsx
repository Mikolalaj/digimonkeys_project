import { useNavigate } from "react-router";
import './TextLink.scss';

export interface ITextLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function TextLink ({href, children}: ITextLinkProps) {
    const navigate = useNavigate();

    return (
    <span className='text-link' onClick={() => navigate(href)}>
        {children}
    </span>
    );
}
