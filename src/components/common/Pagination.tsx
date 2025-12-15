import { Button } from "./Button";

interface PaginationProps {
    page: number;
    itemsPerPage: number;
    totalItems?: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalItems, onPageChange }: PaginationProps) {
    return (
        <div className="w-full flex items-center justify-between h-10">
            <div>
                {totalItems ? <span className="text-center p-8">Garage ({totalItems})</span> : null}
            </div>

            <div className="flex gap-2 items-center">
                <Button disabled={page === 1} onClick={() => onPageChange(page > 1 ? page - 1 : 1)}>
                    Previous
                </Button>
                <span>Page #{page}</span>
                <Button onClick={() => onPageChange(page + 1)}>Next</Button>
            </div>
        </div>
    );
}
