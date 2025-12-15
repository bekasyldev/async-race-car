import { Route, Routes } from "react-router-dom";

import { Garage, Winners } from "./pages";

const App = () => (
    <Routes>
        <Route element={<Garage />} path="/" />
        <Route element={<Winners />} path="/winners" />
    </Routes>
);

export default App;
