import "./ErrorMessage.scss";

export interface IErrorMessageProps {
    message: string;
    size: 'sm' | 'md' | 'lg';
}

export default function ErrorMessage ({ message, size }: IErrorMessageProps) {
    return (
    <p className={`error-message ${size}`}>
        {message}
    </p>
    );
}
