import { useCallback } from "react";

import { SPEED_DIVIDE } from "../constant";
import { api } from "../services/api";
import useStore from "../stores/useStore";

import type { Car } from "../types";

const calcTime = (dist: number, vel: number) => (dist / vel / SPEED_DIVIDE).toFixed(1);

const switchCarToDrive = async (car: Car) => {
    try {
        await api.engine.switchMode({ id: car.id, status: "drive" });
        return { id: car.id, success: true, time: car.time };
    } catch {
        return { id: car.id, success: false, time: car.time };
    }
};

export function useCarAnimations(onWinner?: (id: number, time: number) => Promise<void>) {
    const { setAnimationTime, setRaceActive } = useStore();

    const handleChangeEngine = useCallback(
        async (id: number, status: "started" | "stopped") => {
            try {
                const res = await api.engine.updateEngine({ id, status });
                const time =
                    status === "started"
                        ? parseFloat(calcTime(res.distance, res.velocity))
                        : undefined;
                setAnimationTime(id, time);
            } catch (error) {
                throw new Error(`Engine Error: ${error}`);
            }
        },
        [setAnimationTime],
    );

    const handleReset = useCallback(() => {
        useStore.getState().cars.forEach((car) => setAnimationTime(car.id, undefined));
        setRaceActive(false);
    }, [setAnimationTime, setRaceActive]);

    const handleRace = useCallback(async () => {
        setRaceActive(true);
        const { cars } = useStore.getState();
        await Promise.all(cars.map(async (car) => handleChangeEngine(car.id, "started")));
        const winner = await Promise.race(cars.map(switchCarToDrive));
        if (winner?.success && onWinner) await onWinner(winner.id, winner.time ?? 1);
        setRaceActive(false);
    }, [handleChangeEngine, onWinner, setRaceActive]);

    return { handleChangeEngine, handleReset, handleRace };
}
