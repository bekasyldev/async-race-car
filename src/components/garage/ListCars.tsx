import { useEffect } from "react";

import CarsList from "./CarsList";
import { CARS_PER_PAGE } from "../../constant";
import { useCarAnimations } from "../../hooks/useCarAnimations";
import useStore from "../../stores/useStore";
import Pagination from "../common/Pagination";

import type { Car } from "../../types";

export default function ListCars() {
    const { cars, page, selectCar, fetchCars, deleteCar, setPage, totalCars } = useStore();
    const { handleChangeEngine } = useCarAnimations();

    useEffect(() => {
        fetchCars();
    }, [page, fetchCars]);

    const handleSelectCar = (car: Car) => {
        selectCar(car);
    };

    return (
        <div className="p-5">
            <div className="grid grid-rows-[repeat(auto-fill,minmax(80px,1fr))] gap-4 mb-6">
                <CarsList
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
