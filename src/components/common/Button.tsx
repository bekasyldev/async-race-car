interface Button {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ className, disabled, children, onClick }: Button) => (
    <button
        className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        disabled={disabled}
        onClick={onClick}
        type="button"
    >
        {children}
    </button>
);
