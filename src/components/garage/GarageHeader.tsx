import { Fragment, useState } from "react";

import CarActionForm from "./CarActionForm";
import WinnerModal from "./WinnerModal";
import { useCarAnimations } from "../../hooks/useCarAnimations";
import { api } from "../../services/api";
import useStore from "../../stores/useStore";
import { generateCars } from "../../utils/generateRandomCars";

import type { ActionCar } from "../../types";

const RaceButtons = ({
    onRace,
    onReset,
}: {
    onRace: () => Promise<void> | void;
    onReset: () => void;
}) => (
    <div className="flex gap-3">
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onRace}
            type="button"
        >
            Race
        </button>
        <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onReset}
            type="button"
        >
            Reset
        </button>
    </div>
);

const createCarHandler = async (
    car: ActionCar,
    api_: typeof api,
    fetchCars_: () => Promise<void>,
) => {
    await api_.cars.createCar(car);
    await fetchCars_();
};

const updateCarHandler = async (
    car: ActionCar,
    selectedCarId: number | null,
    api_: typeof api,
    fetchCars_: () => Promise<void>,
) => {
    if (selectedCarId) {
        await api_.cars.updateCar(selectedCarId, car);
        await fetchCars_();
    }
};

const useGarageHeader = () => {
    const { selectedCarId, fetchCars, cars, saveWinner } = useStore();
    const [winner, setWinner] = useState<{ name: string; time: number } | null>(null);

    const handleWinner = async (id: number, time: number) => {
        const foundCar = cars.find((c) => c.id === id);
        if (foundCar) {
            setWinner({ name: foundCar.name, time });
            saveWinner(id, time);
        }
    };

    const handleGenereateCars = async () => {
        await generateCars();
        await fetchCars();
    };

    const { handleRace, handleReset } = useCarAnimations(handleWinner);
    const handleCreateCar = async (car: ActionCar) => createCarHandler(car, api, fetchCars);
    const handleUpdateCar = async (car: ActionCar) =>
        updateCarHandler(car, selectedCarId, api, fetchCars);

    return {
        handleRace,
        handleReset,
        handleCreateCar,
        handleUpdateCar,
        handleGenereateCars,
        winner,
        setWinner,
    };
};

const HeaderContent = ({ handlers }: { handlers: ReturnType<typeof useGarageHeader> }) => (
    <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-8">
                <RaceButtons onRace={handlers.handleRace} onReset={handlers.handleReset} />
                <div className="flex gap-6">
                    <CarActionForm action="create" onSubmit={handlers.handleCreateCar} />
                    <CarActionForm action="update" onSubmit={handlers.handleUpdateCar} />
                </div>
                <div>
                    <button
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        onClick={handlers.handleGenereateCars}
                        type="button"
                    >
                        Generate Cars
                    </button>
                </div>
            </div>
        </div>
    </header>
);

export default function GarageHeader() {
    const handlers = useGarageHeader();
    const { winner, setWinner } = handlers;

    return (
        <Fragment>
            <HeaderContent handlers={handlers} />
            {winner !== null && (
                <WinnerModal
                    name={winner.name}
                    onClose={() => setWinner(null)}
                    time={winner.time}
                />
            )}
        </Fragment>
    );
}
