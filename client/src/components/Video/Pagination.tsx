import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export interface IMyPaginationProps {
    onChangePage: (page: number) => void;
    page: number;
    pageCount: number;
}

export default function MyPagination ({ onChangePage, page, pageCount }: IMyPaginationProps) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination>
            <PaginationItem disabled={page === 1 ? true : false}>
                <PaginationLink
                    previous
                    onClick={() => onChangePage(page-1)}
                />
            </PaginationItem>
            {Array.from(Array(pageCount), ((e, index) => {
                return (
                    <PaginationItem key={index} active={page === index+1 ? true : false}>
                        <PaginationLink onClick={() => onChangePage(index+1)}>
                            {index+1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }))}
            <PaginationItem disabled={page === pageCount ? true : false}>
                <PaginationLink
                    next
                    onClick={() => onChangePage(page+1)}
                />
            </PaginationItem>
        </Pagination>
        </div>
    );
}
