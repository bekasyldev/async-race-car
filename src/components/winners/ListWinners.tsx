import { Fragment } from "react";

import SortControls from "./SortControls";
import TableWinners from "./TableWinners";
import { WINNERS_PER_PAGE } from "../../constant";
import { useWinnersSorting } from "../../hooks/useWinnersSorting";
import Pagination from "../common/Pagination";

export default function ListWinners() {
    const { winners, page, setPage, sortField, sortOrder, handleSort } = useWinnersSorting();

    return (
        <div className="p-5 space-y-4">
            {winners.length === 0 ? (
                <p>No winners</p>
            ) : (
                <Fragment>
                    <SortControls onSort={handleSort} sortField={sortField} sortOrder={sortOrder} />
                    <TableWinners
                        onSort={handleSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        winners={winners}
                    />
                </Fragment>
            )}
            <Pagination
                itemsPerPage={WINNERS_PER_PAGE}
                onPageChange={setPage}
                page={page}
                totalItems={null}
            />
        </div>
    );
}
