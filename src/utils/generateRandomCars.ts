import { api } from "../services/api";

export const generateCars = async () => {
    const RANDOM_CAR_COUNT = 100;

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5", "#F5FF33", "#FF33A8"];
    const carNames = [
        "Speedster",
        "Roadrunner",
        "Thunderbolt",
        "Flash",
        "Blaze",
        "Vortex",
        "Comet",
        "Cyclone",
        "Hurricane",
        "Tornado",
    ];
    const randomeCars = [];

    for (let i = 0; i < RANDOM_CAR_COUNT; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomName = carNames[Math.floor(Math.random() * carNames.length)];
        randomeCars.push({ name: randomName, color: randomColor });
    }

    try {
        const carPromises = randomeCars.map(async (car) => api.cars.createCar(car));
        await Promise.all(carPromises);
    } catch (error) {
        throw new Error(`Error generating random cars: ${error}`);
    }
};
