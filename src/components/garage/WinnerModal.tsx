interface WinnerModalProps {
    name: string;
    time: number;
}

export default function WinnerModal({ name, time }: WinnerModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Winner!</h2>
                <p className="text-lg mb-2">Name: {name}</p>
                <p className="text-lg">Time: {time} seconds</p>
            </div>
        </div>
    );
}
