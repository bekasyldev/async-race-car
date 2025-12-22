interface WinnerModalProps {
    name: string;
    time: number;
    onClose: () => void;
}

export default function WinnerModal({ name, time, onClose }: WinnerModalProps) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/30"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            role="button"
            tabIndex={0}
        >
            <div
                className="bg-white p-6 rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
                role="presentation"
            >
                <h2 className="text-2xl font-bold mb-4">Winner!</h2>
                <p className="text-lg mb-2">Name: {name}</p>
                <p className="text-lg">Time: {time} seconds</p>
            </div>
        </div>
    );
}
