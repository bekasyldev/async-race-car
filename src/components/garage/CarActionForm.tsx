import useStore from "../../stores/useStore";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

import type { ActionCar } from "../../types";

interface CarActionFormProps {
    action: "create" | "update";
    onSubmit: (car: ActionCar) => void;
}

const CarActionForm = ({ action, onSubmit }: CarActionFormProps) => {
    const { createInput, updateInput, setCreateInput, setUpdateInput } = useStore();
    const isCreateAction = action === "create";

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="Car brand"
                type="text"
                value={isCreateAction ? createInput.name : updateInput.name}
                onChange={(e) =>
                    isCreateAction
                        ? setCreateInput(e.target.value, createInput.color)
                        : setUpdateInput(e.target.value, updateInput.color)
                }
            />
            <Input
                type="color"
                value={isCreateAction ? createInput.color : updateInput.color}
                onChange={(e) =>
                    isCreateAction
                        ? setCreateInput(createInput.name, e.target.value)
                        : setUpdateInput(updateInput.name, e.target.value)
                }
            />
            <Button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={
                    isCreateAction
                        ? () => onSubmit({ name: createInput.name, color: createInput.color })
                        : () => onSubmit({ name: updateInput.name, color: updateInput.color })
                }
            >
                {isCreateAction ? "Create" : "Update"}
            </Button>
        </div>
    );
};

export default CarActionForm;
