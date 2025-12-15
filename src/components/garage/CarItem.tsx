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
                    <div className="flex justify-between gap-8">
                        <p className="text-lg font-bold mb-2">{car.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="grid gap-2">
                            <Button className="flex-1" onClick={() => onSelect(car)}>
                                Select
                            </Button>
                            <Button className="flex-1 bg-red-500" onClick={() => onRemove(car.id)}>
                                Remove
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            <Button
                                className="flex-1 bg-green-600"
                                onClick={() => onChangeEngine(car.id, "started")}
                            >
                                A
                            </Button>
                            <Button
                                className="flex-1 bg-yellow-500"
                                onClick={() => onChangeEngine(car.id, "stopped")}
                            >
                                B
                            </Button>
                        </div>
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
