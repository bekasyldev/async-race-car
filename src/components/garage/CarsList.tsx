import CarItem from "./CarItem";

import type { Car } from "../../types";

interface CarsListProps {
    cars: Car[];
    handleSelectCar: (car: Car) => void;
    deleteCar: (id: number) => void;
    handleChangeEngine: (id: number, action: "started" | "stopped") => void;
}

export default function CarsList({
    cars,
    handleSelectCar,
    deleteCar,
    handleChangeEngine,
}: CarsListProps) {
    if (cars.length === 0) {
        return <p>No cars</p>;
    }

    return (
        <div>
            {cars.map((car) => (
                <CarItem
                    key={car.id}
                    car={car}
                    onChangeEngine={handleChangeEngine}
                    onRemove={async () => deleteCar(car.id)}
                    onSelect={handleSelectCar}
                />
            ))}
        </div>
    );
}
