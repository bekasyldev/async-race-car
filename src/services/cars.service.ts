import { API_URL } from "../constant";
import { $fetch, $fetchWithHeaders } from "../utils/fetch";

import type { Car, createCarDTO, getCarsDTO, updateCarDTO } from "../types";

export const carsService = {
    getCars: async (params: getCarsDTO): Promise<{ data: Car[]; totalCount: number | null }> => {
        const query = new URLSearchParams();
        if (params._page) query.append("_page", params._page.toString());
        if (params._limit) query.append("_limit", params._limit.toString());

        const response = $fetchWithHeaders<Car[]>(`${API_URL}/garage?${query.toString()}`);
        return response;
    },
    getCarById: async (id: number): Promise<Car> => {
        const response = await $fetch<Car>(`${API_URL}/garage/${id}`);
        return response;
    },
    createCar: async (car: createCarDTO) => {
        const response = await $fetch(`${API_URL}/garage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        });
        return response;
    },
    deleteCar: async (id: number) => {
        const response = $fetch(`${API_URL}/garage/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    },
    updateCar: async (id: number, car: updateCarDTO) => {
        const response = await $fetch(`${API_URL}/garage/${id}`, {
            method: "PUT",
            body: JSON.stringify(car),
        });
        return response;
    },
};
