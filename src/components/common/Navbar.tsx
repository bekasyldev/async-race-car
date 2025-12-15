import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex items-center gap-10 bg-gray-500 p-4 text-white">
            <span className="text-2xl font-semibold">Async Race</span>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/">Garage</Link>
                </li>
                <li>
                    <Link to="/winners">Winners</Link>
                </li>
            </ul>
        </nav>
    );
}
