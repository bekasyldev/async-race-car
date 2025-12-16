import { useState } from "react";

import { Button } from "../common/Button";
import { Input } from "../common/Input";

import type { ActionCar } from "../../types";

interface CarActionFormProps {
    action: "create" | "update";
    onSubmit: (car: ActionCar) => void;
}

const CarActionForm = ({ action, onSubmit }: CarActionFormProps) => {
    const [createCarBrand, setCreateCarBrand] = useState("");
    const [updateCarBrand, setUpdateCarBrand] = useState("");
    const [createCarColor, setCreateCarColor] = useState("#000000");
    const [updateCarColor, setUpdateCarColor] = useState("#000000");
    const isCreateAction = action === "create";

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="Car brand"
                type="text"
                value={isCreateAction ? createCarBrand : updateCarBrand}
                onChange={(e) =>
                    isCreateAction
                        ? setCreateCarBrand(e.target.value)
                        : setUpdateCarBrand(e.target.value)
                }
            />
            <Input
                type="color"
                value={isCreateAction ? createCarColor : updateCarColor}
                onChange={(e) =>
                    isCreateAction
                        ? setCreateCarColor(e.target.value)
                        : setUpdateCarColor(e.target.value)
                }
            />
            <Button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={
                    isCreateAction
                        ? () => onSubmit({ name: createCarBrand, color: createCarColor })
                        : () => onSubmit({ name: updateCarBrand, color: updateCarColor })
                }
            >
                {isCreateAction ? "Create" : "Update"}
            </Button>
        </div>
    );
};

export default CarActionForm;
