import { create } from "zustand";

import type { Car } from "../types";

interface User {
    id: number;
    name: string;
    color: string;
    winnerName: string;
    winnerTime: number;
}

interface Action {
    setCar: (car: Car) => void;
    clearCar: () => void;
    setWinner: (name: string, time: number) => void;
}

const useStore = create<User & Action>((set) => ({
    id: 0,
    name: "",
    color: "",
    winnerName: "",
    winnerTime: 0,
    setCar: (car: Car) => set(() => ({ ...car })),
    clearCar: () => set(() => ({ id: 0, name: "", color: "" })),
    setWinner: (name: string, time: number) => set(() => ({ winnerName: name, winnerTime: time })),
}));

export default useStore;
