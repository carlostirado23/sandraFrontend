import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NuevoCliente from "./pages/home/NuevoCliente";
import DetallesCliente from "./pages/home/DetallesCliente";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/NuevoCliente" element={<NuevoCliente />} />
            <Route path="/:id" element={<DetallesCliente />} />
        </Routes>
    );
};

export default App;
