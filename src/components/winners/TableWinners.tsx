import { useEffect, useState } from "react";

import { WINNERS_PER_PAGE } from "../../constant";
import { api } from "../../services/api";
import Pagination from "../common/Pagination";

import type { Winner } from "../../types";

export default function ListWinners() {
    const [winners, setWinners] = useState<Winner[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await api.winners.getWinners({
                    _page: page,
                    _limit: WINNERS_PER_PAGE,
                });
                setWinners(response);
            } catch (error) {
                throw new Error(`Error fetching winners: ${error}`);
            }
        };

        fetchWinners();
    }, [page]);

    return (
        <div className="p-5 space-y-4">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Car</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Wins</th>
                        <th className="border border-gray-300 px-4 py-2">Best Time (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.map((winner) => (
                        <tr key={winner.id} className="hover:bg-gray-100">
                            <td
                                aria-label="Winner ID"
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                {winner.id}
                            </td>
                            <td
                                aria-label="Car color"
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                <div
                                    style={{
                                        width: "50px",
                                        height: "30px",
                                        backgroundColor: "#0000",
                                        margin: "0 auto",
                                    }}
                                />
                            </td>
                            <td
                                aria-label="Winner name"
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                {winner.name}
                            </td>
                            <td
                                aria-label="Number of wins"
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                {winner.wins}
                            </td>
                            <td
                                aria-label="Best time in seconds"
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                {winner.time}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination itemsPerPage={WINNERS_PER_PAGE} onPageChange={setPage} page={page} />
        </div>
    );
}
