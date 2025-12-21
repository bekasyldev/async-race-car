import CarIcon from "./CarIcon";
import { SPEED_DIVIDE } from "../../constant";
import { Button } from "../common/Button";

import type { Car } from "../../types";

interface CarProps {
    car: Car;
    onSelect: (car: Car) => void;
    onRemove: (id: number) => void;
    onChangeEngine: (id: number, action: "started" | "stopped") => void;
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
    id,
    onChangeEngine,
}: {
    id: number;
    onChangeEngine: CarProps["onChangeEngine"];
}) => (
    <div className="grid gap-2">
        <Button className="flex-1 bg-green-600" onClick={() => onChangeEngine(id, "started")}>
            A
        </Button>
        <Button className="flex-1 bg-yellow-500" onClick={() => onChangeEngine(id, "stopped")}>
            B
        </Button>
    </div>
);

export default function CarItem({ car, onSelect, onRemove, onChangeEngine }: CarProps) {
    const getAnimationStyle = () => {
        if (!car.time || !car.startTime) return {};
        const elapsed = (Date.now() - car.startTime) / SPEED_DIVIDE; // convert to seconds
        const remaining = car.time - elapsed;
        if (remaining <= 0) {
            return {
                transform: "translateX(calc(100% - 50px))",
            };
        }
        return {
            animation: `slide-in ${car.time}s linear forwards`,
            animationDelay: `-${elapsed}s`,
        };
    };
    return (
        <div key={car.id} className="border p-4 rounded shadow">
            <div className="flex items-center justify-start gap-4">
                <div className="max-w-48">
                    <p className="text-lg font-bold mb-2">{car.name}</p>
                    <div className="flex gap-2">
                        <ActionButtons car={car} onRemove={onRemove} onSelect={onSelect} />
                        <EngineButtons id={car.id} onChangeEngine={onChangeEngine} />
                    </div>
                </div>
                <div className="border-black border-b w-full relative overflow-hidden">
                    <div style={getAnimationStyle()}>
                        <CarIcon color={car.color} />
                    </div>
                </div>
            </div>
        </div>
    );
}
