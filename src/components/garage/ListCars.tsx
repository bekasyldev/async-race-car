import { useEffect } from "react";

import CarItem from "./CarItem";
import { CARS_PER_PAGE } from "../../constant";
import { api } from "../../services/api";
import useStore from "../../stores/useStore";
import Pagination from "../common/Pagination";

import type { Car } from "../../types";

const Cars = ({
    cars,
    handleSelectCar,
    deleteCar,
    handleChangeEngine,
}: {
    cars: Car[];
    handleSelectCar: (car: Car) => void;
    deleteCar: (id: number) => void;
    handleChangeEngine: (id: number, action: "started" | "stopped") => void;
}) => (
    <div>
        {cars.length === 0 ? (
            <p>No cars</p>
        ) : (
            cars.map((car) => (
                <CarItem
                    key={car.id}
                    car={car}
                    onChangeEngine={handleChangeEngine}
                    onRemove={async () => deleteCar(car.id)}
                    onSelect={handleSelectCar}
                />
            ))
        )}
    </div>
);

export default function ListCars() {
    const { cars, page, selectCar, fetchCars, deleteCar, setPage, totalCars } = useStore();

    useEffect(() => {
        fetchCars();
    }, [page, fetchCars]);

    const handleSelectCar = (car: Car) => {
        selectCar(car);
    };

    const handleChangeEngine = async (id: number, status: "started" | "stopped") => {
        try {
            await api.engine.updateEngine({ id, status });
        } catch (error) {
            throw new Error(`Error changing engine status: ${error}`);
        }
    };

    return (
        <div className="p-5">
            <div className="grid grid-rows-[repeat(auto-fill,minmax(80px,1fr))] gap-4 mb-6">
                <Cars
                    cars={cars}
                    deleteCar={deleteCar}
                    handleChangeEngine={handleChangeEngine}
                    handleSelectCar={handleSelectCar}
                />
            </div>
            <Pagination
                itemsPerPage={CARS_PER_PAGE}
                onPageChange={setPage}
                page={page}
                totalItems={totalCars}
            />
        </div>
    );
}
