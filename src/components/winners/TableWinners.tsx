import type { WinnerWithCar } from "../../types";

type SortField = "wins" | "time";
type SortOrder = "ASC" | "DESC";

interface TableWinnersProps {
    onSort: (field: SortField) => void;
    sortField: SortField | null;
    sortOrder: SortOrder;
    winners: WinnerWithCar[];
}

const SortIndicator = ({
    field,
    sortField,
    sortOrder,
}: {
    field: SortField;
    sortField: SortField | null;
    sortOrder: SortOrder;
}) => {
    if (sortField !== field) return null;
    return <span className="ml-1">{sortOrder === "ASC" ? "▲" : "▼"}</span>;
};

const SortableHeader = ({
    field,
    label,
    onSort,
    sortField,
    sortOrder,
}: {
    field: SortField;
    label: string;
    onSort: (field: SortField) => void;
    sortField: SortField | null;
    sortOrder: SortOrder;
}) => (
    <th
        className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-300 select-none"
        onClick={() => onSort(field)}
        role="button"
        tabIndex={0}
    >
        {label}
        <SortIndicator field={field} sortField={sortField} sortOrder={sortOrder} />
    </th>
);

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

export default function TableWinners({ onSort, sortField, sortOrder, winners }: TableWinnersProps) {
    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Color</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <SortableHeader
                        field="wins"
                        label="Wins"
                        onSort={onSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                    />
                    <SortableHeader
                        field="time"
                        label="Best Time (s)"
                        onSort={onSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                    />
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
