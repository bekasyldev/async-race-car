import { carsService } from "./cars.service";
import { engineService } from "./engine.service";
import { winnerService } from "./winner.service";

export const api = {
    cars: carsService,
    engine: engineService,
    winners: winnerService,
};
