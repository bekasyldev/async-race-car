import { useEffect, useState } from "react";

import CarItem from "./CarItem";
import { api } from "../../services/api";
import useStore from "../../stores/useStore";
import Pagination from "../common/Pagination";

import type { Car } from "../../types";

export default function ListCars() {
    const [page, setPage] = useState(1);
    const [cars, setCars] = useState<Car[]>([]);
    const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
    const useUserStore = useStore();
    const carsPerPage = 7;

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.cars.getCars({
                    _page: page,
                    _limit: carsPerPage,
                });
                const { data, totalCount } = response;
                setTotalItems(totalCount ?? undefined);
                setCars(data);
            } catch (error) {
                throw new Error(`Error fetching cars: ${error}`);
            }
        };
        fetchCars();
    }, [page]);

    const handelSelectCar = (car: Car) => {
        useUserStore.setCar(car);
    };

    const handleRemoveCar = async (carId: number) => {
        try {
            await api.cars.deleteCar(carId);
        } catch (error) {
            throw new Error(`Error removing car: ${error}`);
        }
    };

    const handleChangeEngine = async (carId: number, status: "started" | "stopped") => {
        try {
            await api.engine.updateEngine({ id: carId, status });
        } catch (error) {
            throw new Error(`Error changing engine status: ${error}`);
        }
    };

    return (
        <div className="p-5">
            <div className="grid grid-rows-[repeat(auto-fill,minmax(80px,1fr))] gap-4 mb-6">
                {cars.map((car) => (
                    <CarItem
                        key={car.id}
                        car={car}
                        onChangeEngine={handleChangeEngine}
                        onRemove={handleRemoveCar}
                        onSelect={handelSelectCar}
                    />
                ))}
            </div>
            <Pagination
                itemsPerPage={carsPerPage}
                onPageChange={setPage}
                page={page}
                totalItems={totalItems}
            />
        </div>
    );
}
