import { API_URL } from "../constant";
import { $fetch } from "../utils/fetch";

import type { createWinnerDTO, getWinnersDTO, updateWinnerDTO, Winner } from "../types";

export const winnerService = {
    getWinners: async (params?: getWinnersDTO): Promise<Winner[]> => {
        const query = new URLSearchParams();
        if (params) {
            if (params._page) query.append("_page", params._page.toString());
            if (params._limit) query.append("_limit", params._limit.toString());
            if (params._sort) query.append("_sort", params._sort);
            if (params._order) query.append("_order", params._order);
        }
        const response = $fetch<Winner[]>(`${API_URL}/winners?${query}`);
        return response;
    },
    getWinnerById: async (id: number) => {
        const response = $fetch(`${API_URL}/winners/${id}`);
        return response;
    },
    createWinner: async (winner: createWinnerDTO) => {
        const response = $fetch(`${API_URL}/winners`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(winner),
        });
        return response;
    },
    deleteWinner: async (id: number) => {
        const response = $fetch(`${API_URL}/winners/${id}`, {
            method: "DELETE",
        });
        return response;
    },
    updateWinner: async (id: number, winner: updateWinnerDTO) => {
        const response = $fetch(`${API_URL}/winners/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(winner),
        });
        return response;
    },
};
