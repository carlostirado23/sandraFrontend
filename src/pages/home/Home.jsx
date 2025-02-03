import { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchBar from "../../components/SearchBar";
import ClientTable from "../../components/ClientTable";

// Componente estilizado para el loader
const LoaderOverlay = styled("div")({
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1400,
});

const columns = [
    { id: "nombres", label: "Nombre", minWidth: 170 },
    { id: "apellidos", label: "Apellido", minWidth: 170 },
    { id: "telefono", label: "Teléfono", minWidth: 130 },
    { id: "fechaEntrega", label: "Fecha Entrega", minWidth: 170 },
    { id: "imagen", label: "Imagen", minWidth: 130 },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
];

const Home = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success",
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_USER_API}/api/clientes`);
            const clientesFormateados = response.data.map((cliente) => ({
                ...cliente,
                fechaEntrega: formatearFecha(cliente.fechaEntrega),
            }));
            setClientes(clientesFormateados);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            showAlert("Error al cargar clientes", "error");
        }
    };

    const formatearFecha = (timestamp) => {
        if (!timestamp) return "";
        if (timestamp._seconds) {
            const fecha = new Date(timestamp._seconds * 1000);
            return fecha.toISOString().split("T")[0];
        }
        return timestamp;
    };

    const clientesFiltrados = clientes.filter((cliente) =>
        (cliente.nombres + " " + cliente.apellidos).toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert((prev) => ({ ...prev, show: false }));
    };

    const showAlert = (message, type = "success") => {
        setAlert({
            show: true,
            message,
            type,
        });
    };

    const handleDelete = (cliente) => {
        setSelectedClient(cliente);
        setDeleteDialogOpen(true);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setSelectedClient(null);
        showAlert("Operación cancelada", "info");
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_USER_API}/api/clientes/${selectedClient.id}`);

            setClientes((prev) => prev.filter((cliente) => cliente.id !== selectedClient.id));
            setDeleteDialogOpen(false);
            setSelectedClient(null);
            showAlert("Cliente eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            showAlert("Error al eliminar cliente", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNuevoCliente = () => {
        navigate("/NuevoCliente");
    };

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <Snackbar
                open={alert.show}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: "100%" }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            {isLoading && (
                <LoaderOverlay>
                    <CircularProgress size={60} />
                </LoaderOverlay>
            )}

            <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Registro de Clientes</h1>
                    <Button variant="contained" onClick={handleNuevoCliente}>
                        <Plus className="w-4 h-4 mr-2" /> Nuevo Cliente
                    </Button>
                </div>

                <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

                <ClientTable
                    columns={columns}
                    clientesFiltrados={clientesFiltrados}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleDelete={handleDelete}
                />
            </div>

            {deleteDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-xl">
                        <p className="mb-6 text-gray-600">
                            ¿Está seguro que desea eliminar al cliente {selectedClient?.nombres}{" "}
                            {selectedClient?.apellidos}?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 border rounded-md"
                                disabled={isLoading}>
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-600 rounded-md"
                                disabled={isLoading}>
                                {isLoading ? "Eliminando..." : "Eliminar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
