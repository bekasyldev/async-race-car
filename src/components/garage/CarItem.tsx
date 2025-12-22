import CarIcon from "./CarIcon";
import { SPEED_DIVIDE } from "../../constant";
import useStore from "../../stores/useStore";
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
    isRaceActive,
    onRemove,
    onSelect,
}: {
    car: Car;
    isRaceActive: boolean;
    onRemove: (id: number) => void;
    onSelect: (car: Car) => void;
}) => (
    <div className="grid gap-2">
        <Button className="flex-1" disabled={isRaceActive} onClick={() => onSelect(car)}>
            Select
        </Button>
        <Button
            className="flex-1 bg-red-500"
            disabled={isRaceActive}
            onClick={() => onRemove(car.id)}
        >
            Remove
        </Button>
    </div>
);

const EngineButtons = ({
    car,
    id,
    onChangeEngine,
}: {
    car: Car;
    id: number;
    onChangeEngine: (id: number, action: "started" | "stopped") => void;
}) => {
    const isAtStart = !car.time || !car.startTime;
    const isAnimating = !!(car.time && car.startTime);
    return (
        <div className="grid gap-2">
            <Button
                className="flex-1 bg-green-600"
                disabled={isAnimating}
                onClick={() => onChangeEngine(id, "started")}
            >
                A
            </Button>
            <Button
                className="flex-1 bg-yellow-500"
                disabled={isAtStart}
                onClick={() => onChangeEngine(id, "stopped")}
            >
                B
            </Button>
        </div>
    );
};

export default function CarItem({ car, onRemove, onSelect, onChangeEngine }: CarProps) {
    const { isRaceActive } = useStore();
    const getAnimationStyle = () => {
        if (!car.time || !car.startTime) return {};
        const elapsed = (Date.now() - car.startTime) / SPEED_DIVIDE;
        const remaining = car.time - elapsed;
        if (remaining <= 0) return { transform: "translateX(calc(100% - 50px))" };
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
                        <ActionButtons
                            car={car}
                            isRaceActive={isRaceActive}
                            onRemove={onRemove}
                            onSelect={onSelect}
                        />
                        <EngineButtons car={car} id={car.id} onChangeEngine={onChangeEngine} />
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
