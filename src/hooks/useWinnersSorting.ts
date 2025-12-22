import { useEffect, useState } from "react";

import { WINNERS_PER_PAGE } from "../constant";
import { api } from "../services/api";

import type { WinnerWithCar } from "../types";

type SortField = "wins" | "time";
type SortOrder = "ASC" | "DESC";

export function useWinnersSorting() {
    const [winners, setWinners] = useState<WinnerWithCar[]>([]);
    const [page, setPage] = useState(1);
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
        } else {
            setSortField(field);
            setSortOrder("ASC");
        }
        setPage(1);
    };

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await api.winners.getWinners({
                    _page: page,
                    _limit: WINNERS_PER_PAGE,
                    _sort: sortField ?? undefined,
                    _order: sortField ? sortOrder : undefined,
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
    }, [page, sortField, sortOrder]);

    return { winners, page, setPage, sortField, sortOrder, handleSort };
}
