interface SortControlsProps {
    onSort: (field: "wins" | "time") => void;
    sortField: ("wins" | "time") | null;
    sortOrder: "ASC" | "DESC";
}

export default function SortControls({ onSort, sortField, sortOrder }: SortControlsProps) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded">
            <label className="flex items-center gap-2" htmlFor="sort-field">
                <span className="font-semibold">Sort by:</span>
                <select
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="sort-field"
                    value={sortField ?? ""}
                    onChange={(e) => {
                        const value = e.target.value as "wins" | "time";
                        if (value) onSort(value);
                    }}
                >
                    <option value="">None</option>
                    <option value="wins">Wins</option>
                    <option value="time">Best Time</option>
                </select>
            </label>
            {sortField !== null && (
                <label className="flex items-center gap-2" htmlFor="sort-order">
                    <span className="font-semibold">Order:</span>
                    <select
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => {
                            if (e.target.value !== sortOrder) {
                                onSort(sortField);
                            }
                        }}
                    >
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </label>
            )}
        </div>
    );
}
