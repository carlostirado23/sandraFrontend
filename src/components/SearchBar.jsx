import { Search } from "lucide-react";

const SearchBar = ({ busqueda, setBusqueda }) => {
    return (
        <div className="relative mb-6">
            <Search className="absolute w-4 h-4 text-gray-500 left-3 top-3" />
            <input
                type="text"
                placeholder="Buscar cliente..."
                className="w-full py-2 pl-10 pr-4 border rounded-md"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
