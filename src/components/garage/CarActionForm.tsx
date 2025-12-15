import { useState } from "react";

import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface CarActionFormProps {
    action: "create" | "update";
    onSubmit: (name: string, color: string) => void;
}

const CarActionForm = ({ action, onSubmit }: CarActionFormProps) => {
    const [createCarBrand, setCreateCarBrand] = useState("");
    const [updateCarBrand, setUpdateCarBrand] = useState("");
    const [createCarColor, setCreateCarColor] = useState("#000000");
    const [updateCarColor, setUpdateCarColor] = useState("#000000");

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="Car brand"
                type="text"
                value={createCarBrand}
                onChange={(e) =>
                    action === "create"
                        ? setCreateCarBrand(e.target.value)
                        : setUpdateCarBrand(e.target.value)
                }
            />
            <Input
                type="color"
                value={createCarColor}
                onChange={(e) =>
                    action === "create"
                        ? setCreateCarColor(e.target.value)
                        : setUpdateCarColor(e.target.value)
                }
            />
            <Button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={
                    action === "create"
                        ? () => onSubmit(createCarBrand, createCarColor)
                        : () => onSubmit(updateCarBrand, updateCarColor)
                }
            >
                Create
            </Button>
        </div>
    );
};

export default CarActionForm;
