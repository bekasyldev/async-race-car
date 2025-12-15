import CarActionForm from "./CarActionForm";
import { api } from "../../services/api";
import useStore from "../../stores/useStore";
import { generateCars } from "../../utils/generateRandomCars";
import { Button } from "../common/Button";

export default function GarageHeader() {
    const useUserStore = useStore();

    const handleCreateCar = async (name: string, color: string) => {
        try {
            await api.cars.createCar({
                name,
                color,
            });
        } catch (error) {
            throw new Error(`Error creating car: ${error}`);
        }
    };

    const handleUpdateCar = async (name: string, color: string) => {
        try {
            const carId = useUserStore.id;
            await api.cars.updateCar(carId, {
                name,
                color,
            });
        } catch (error) {
            throw new Error(`Error updating car: ${error}`);
        }
    };

    const handleGetWinner = async () => {
        // Get winner
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex gap-3">
                        <Button onClick={handleGetWinner}>Race</Button>
                        <Button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                            Reset
                        </Button>
                    </div>

                    <div className="flex gap-6">
                        <CarActionForm action="create" onSubmit={handleCreateCar} />
                        <CarActionForm action="update" onSubmit={handleUpdateCar} />
                    </div>
                    <div>
                        <Button
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            onClick={generateCars}
                        >
                            Generate Cars
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
