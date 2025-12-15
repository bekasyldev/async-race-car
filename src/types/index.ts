export interface Car {
    id: number;
    name: string;
    color: string;
}

export interface getCarsDTO {
    _page?: number;
    _limit?: number;
}

export interface createCarDTO {
    name: string;
    color: string;
}

export interface updateCarDTO {
    name?: string;
    color?: string;
}

// Engine related types

export interface Engine {
    velocity: number;
    distance: number;
}

export interface engineActionDTO {
    id: number;
    status: "started" | "stopped";
}

export interface engineModeDTO {
    id: number;
    status: "drive";
}

// Winners related types

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export interface WinnerWithCar extends Winner {
    car: Car;
}

export interface getWinnersDTO {
    _page?: number;
    _limit?: number;
    _sort?: "id" | "wins" | "time";
    _order?: "ASC" | "DESC";
}

export interface createWinnerDTO {
    id: number;
    wins: number;
    time: number;
}

export interface updateWinnerDTO {
    wins?: number;
    time?: number;
}
