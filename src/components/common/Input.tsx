interface Input {
    className?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ className, type = "text", placeholder, value, onChange }: Input) => (
    <input
        className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
    />
);
