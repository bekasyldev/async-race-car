import CarIcon from "./CarIcon";
import { Button } from "../common/Button";

import type { Car } from "../../types";

interface CarProps {
    car: Car;
    onSelect: (car: Car) => void;
    onRemove: (id: number) => void;
    onChangeEngine: (id: number, action: "started" | "stopped") => void;
    animationTime?: number;
}

const ActionButtons = ({
    car,
    onSelect,
    onRemove,
}: Pick<CarProps, "car" | "onSelect" | "onRemove">) => (
    <div className="grid gap-2">
        <Button className="flex-1" onClick={() => onSelect(car)}>
            Select
        </Button>
        <Button className="flex-1 bg-red-500" onClick={() => onRemove(car.id)}>
            Remove
        </Button>
    </div>
);

const EngineButtons = ({
    carId,
    onChangeEngine,
}: {
    carId: number;
    onChangeEngine: CarProps["onChangeEngine"];
}) => (
    <div className="grid gap-2">
        <Button className="flex-1 bg-green-600" onClick={() => onChangeEngine(carId, "started")}>
            A
        </Button>
        <Button className="flex-1 bg-yellow-500" onClick={() => onChangeEngine(carId, "stopped")}>
            B
        </Button>
    </div>
);

export default function CarItem({
    car,
    onSelect,
    onRemove,
    onChangeEngine,
    animationTime = 3000,
}: CarProps) {
    return (
        <div key={car.id} className="border p-4 rounded shadow">
            <div className="flex items-center justify-start gap-4">
                <div className="max-w-48">
                    <p className="text-lg font-bold mb-2">{car.name}</p>
                    <div className="flex gap-2">
                        <ActionButtons car={car} onRemove={onRemove} onSelect={onSelect} />
                        <EngineButtons carId={car.id} onChangeEngine={onChangeEngine} />
                    </div>
                </div>
                <div className="border-black border-b w-full relative overflow-hidden">
                    <div style={{ animation: `slide-in ${animationTime}ms linear forwards` }}>
                        <CarIcon color={car.color} />
                    </div>
                </div>
            </div>
        </div>
    );
}
