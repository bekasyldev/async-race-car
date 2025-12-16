import { create } from "zustand";

import { CARS_PER_PAGE } from "../constant";
import { api } from "../services/api";

import type { ActionCar, Car } from "../types";

interface CarState {
    cars: Car[];
    totalCars: number | null;
    page: number;
    createInput: {
        name: string;
        color: string;
    };
    updateInput: {
        name: string;
        color: string;
    };
    selectedCarId: number | null;
    setPage: (page: number) => void;
    setCreateInput: (name: string, color: string) => void;
    setUpdateInput: (name: string, color: string) => void;
    selectCar: (car: Car) => void;
    fetchCars: () => Promise<void>;
    createCar: (car: ActionCar) => Promise<void>;
    updateCar: (car: ActionCar) => Promise<void>;
    deleteCar: (id: number) => Promise<void>;
}

const useStore = create<CarState>((set, get) => ({
    cars: [],
    totalCars: 0,
    page: 1,
    createInput: { name: "", color: "#000000" },
    updateInput: { name: "", color: "#000000" },
    selectedCarId: null,
    setPage: (page) => set({ page }),
    setCreateInput: (name, color) => set({ createInput: { name, color } }),
    setUpdateInput: (name, color) => set({ updateInput: { name, color } }),
    selectCar: (car) =>
        set({ selectedCarId: car.id, updateInput: { name: car.name, color: car.color } }),
    fetchCars: async () => {
        const { page } = get();
        const response = await api.cars.getCars({ _page: page, _limit: CARS_PER_PAGE });
        set({ cars: response.data, totalCars: response.totalCount });
    },
    createCar: async () => {
        const { fetchCars, createInput } = get();
        await api.cars.createCar(createInput);
        await fetchCars();
    },
    updateCar: async () => {
        const { selectedCarId, fetchCars, updateInput } = get();
        if (selectedCarId) {
            await api.cars.updateCar(selectedCarId, updateInput);
            await fetchCars();
        }
    },
    deleteCar: async (id) => {
        await api.cars.deleteCar(id);
        await get().fetchCars();
    },
}));

export default useStore;
