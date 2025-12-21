import { useCallback } from "react";

import { SPEED_DIVIDE } from "../constant";
import { api } from "../services/api";
import useStore from "../stores/useStore";

export function useCarAnimations() {
    const { setAnimationTime } = useStore();

    const handleChangeEngine = useCallback(
        async (id: number, status: "started" | "stopped") => {
            try {
                const response = await api.engine.updateEngine({ id, status });
                if (status === "started") {
                    const { velocity, distance } = response;
                    const time = (distance / velocity / SPEED_DIVIDE).toFixed(1);
                    setAnimationTime(id, parseFloat(time));
                } else {
                    setAnimationTime(id, undefined);
                }
            } catch (error) {
                throw new Error(`Error when updating engine ${error}`);
            }
        },
        [setAnimationTime],
    );

    return { handleChangeEngine };
}
