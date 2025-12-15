import type { WinnerWithCar } from "../../types";

interface TableWinnersProps {
    winners: WinnerWithCar[];
}

const WinnerRow = ({ winner }: { winner: WinnerWithCar }) => (
    <tr key={winner.id} className="hover:bg-gray-100">
        <td aria-label="Winner ID" className="border border-gray-300 px-4 py-2 text-center">
            {winner.id}
        </td>
        <td aria-label="Car color" className="border border-gray-300 px-4 py-2 text-center">
            <div
                style={{
                    width: "50px",
                    height: "30px",
                    backgroundColor: winner.car.color,
                    margin: "0 auto",
                }}
            />
        </td>
        <td aria-label="Winner name" className="border border-gray-300 px-4 py-2 text-center">
            {winner.car.name}
        </td>
        <td aria-label="Number of wins" className="border border-gray-300 px-4 py-2 text-center">
            {winner.wins}
        </td>
        <td
            aria-label="Best time in seconds"
            className="border border-gray-300 px-4 py-2 text-center"
        >
            {winner.time}
        </td>
    </tr>
);

export default function TableWinners({ winners }: TableWinnersProps) {
    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Color</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Wins</th>
                    <th className="border border-gray-300 px-4 py-2">Best Time (s)</th>
                </tr>
            </thead>
            <tbody>
                {winners.map((winner) => (
                    <WinnerRow key={winner.id} winner={winner} />
                ))}
            </tbody>
        </table>
    );
}
