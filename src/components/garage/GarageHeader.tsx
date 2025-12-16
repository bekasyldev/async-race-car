import CarActionForm from "./CarActionForm";
import useStore from "../../stores/useStore";
import { generateCars } from "../../utils/generateRandomCars";
import { Button } from "../common/Button";

export default function GarageHeader() {
    const { createCar, updateCar, fetchCars } = useStore();
    const handleGetWinner = async () => {
        // TODO: Implement race logic
    };

    const handelGenerateCars = async () => {
        try {
            await generateCars();
            await fetchCars();
        } catch (error) {
            throw new Error(`Error generating cars: ${error}`);
        }
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
                        <CarActionForm action="create" onSubmit={createCar} />
                        <CarActionForm action="update" onSubmit={updateCar} />
                    </div>
                    <div>
                        <Button
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            onClick={handelGenerateCars}
                        >
                            Generate Cars
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
