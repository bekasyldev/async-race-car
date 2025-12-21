import { API_URL } from "../constant";
import { $fetch } from "../utils/fetch";

import type { Engine, engineActionDTO, engineModeDTO } from "../types";

export const engineService = {
    updateEngine: async (engine: engineActionDTO): Promise<Engine> => {
        const params = new URLSearchParams();
        if (engine.id) params.append("id", engine.id.toString());
        if (engine.status) params.append("status", engine.status);
        const response = $fetch<Engine>(`${API_URL}/engine?${params.toString()}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        });
        return response;
    },
    switchMode: async (engineMode: engineModeDTO): Promise<Engine> => {
        const params = new URLSearchParams();
        if (engineMode.id) params.append("id", engineMode.id.toString());
        if (engineMode.status) params.append("mode", engineMode.status);
        const response = $fetch<Engine>(`${API_URL}/engine?${params.toString()}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        });
        return response;
    },
};
