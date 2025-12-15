import { API_URL } from "../constant";
import { $fetch } from "../utils/fetch";

import type { engineActionDTO, engineModeDTO } from "../types";

export const engineService = {
    updateEngine: async (engine: engineActionDTO) => {
        const response = $fetch(`${API_URL}/engine`, {
            method: "PATCH",
            body: JSON.stringify(engine),
            headers: { "Content-Type": "application/json" },
        });
        return response;
    },
    switchMode: async (engineMode: engineModeDTO) => {
        const response = $fetch(`${API_URL}/engine`, {
            method: "PATCH",
            body: JSON.stringify(engineMode),
            headers: { "Content-Type": "application/json" },
        });
        return response;
    },
};
