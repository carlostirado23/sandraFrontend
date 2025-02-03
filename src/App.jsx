import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NuevoCliente from "./pages/home/NuevoCliente";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/NuevoCliente" element={<NuevoCliente />} />
        </Routes>
    );
};

export default App;
