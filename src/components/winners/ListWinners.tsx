import { useEffect, useState } from "react";

import TableWinners from "./TableWinners";
import { WINNERS_PER_PAGE } from "../../constant";
import { api } from "../../services/api";
import Pagination from "../common/Pagination";

import type { WinnerWithCar } from "../../types";

export default function ListWinners() {
    const [winners, setWinners] = useState<WinnerWithCar[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await api.winners.getWinners({
                    _page: page,
                    _limit: WINNERS_PER_PAGE,
                });
                const winnersData: WinnerWithCar[] = await Promise.all(
                    response.map(async (winner): Promise<WinnerWithCar> => {
                        const car = await api.cars.getCarById(winner.id);
                        return { ...winner, car };
                    }),
                );
                setWinners(winnersData);
            } catch (error) {
                throw new Error(`Error fetching winners: ${error}`);
            }
        };

        fetchWinners();
    }, [page]);

    return (
        <div className="p-5 space-y-4">
            {winners.length === 0 ? <p>No winners</p> : <TableWinners winners={winners} />}
            <Pagination
                itemsPerPage={WINNERS_PER_PAGE}
                onPageChange={setPage}
                page={page}
                totalItems={null}
            />
        </div>
    );
}
