import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Search, Plus } from "lucide-react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Estilo personalizado para el modal
const ModalOverlay = styled("div")({
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    zIndex: 1300, // Valor mayor que el z-index del sticky header
});

const ModalContent = styled("div")({
    backgroundColor: "white",
    borderRadius: "0.5rem",
    width: "100%",
    maxWidth: "28rem",
    padding: "1.5rem",
    position: "relative",
    zIndex: 1301, // Un poco mayor que el overlay
});

// Componente estilizado para el loader
const LoaderOverlay = styled('div')({
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1400,
});

const columns = [
    { id: "nombres", label: "Nombres", minWidth: 170 },
    { id: "apellidos", label: "Apellidos", minWidth: 170 },
    { id: "telefono", label: "Teléfono", minWidth: 130 },
    { id: "fechaEntrega", label: "Fecha Entrega", minWidth: 130 },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
];

const Home = () => {
    const { register, handleSubmit, reset } = useForm();
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
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
        axios
            .get(`${import.meta.env.VITE_USER_API}/api/clientes`)
            .then((response) => {
                const clientesFormateados = response.data.map((cliente) => ({
                    ...cliente,
                    fechaEntrega: formatearFecha(cliente.fechaEntrega),
                }));
                setClientes(clientesFormateados);
            })
            .catch((error) => console.error("Error al obtener clientes:", error));
    }, []);

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

    const handleOpenDialog = () => {
        setDialogOpen(true);
        reset();
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_USER_API}/api/clientes`, data);

            const nuevoCliente = {
                ...response.data,
                fechaEntrega: formatearFecha(response.data.fechaEntrega),
            };
            setClientes((prev) => [...prev, nuevoCliente]);
            handleCloseDialog();
            showAlert("Cliente agregado exitosamente");
        } catch (error) {
            console.error("Error al crear cliente:", error);
            showAlert("Error al crear cliente", "error");
        } finally {
            setIsLoading(false);
        }
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
    return (
        <div className="max-w-6xl p-6 mx-auto">
            {/* Snackbar para mostrar alertas */}
            <Snackbar
                open={alert.show}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: "100%" }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            {/* Loader overlay */}
            {isLoading && (
                <LoaderOverlay>
                    <CircularProgress size={60} />
                </LoaderOverlay>
            )}

            <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Registro de Clientes</h1>
                    <Button variant="contained" onClick={handleOpenDialog}>
                        <Plus className="w-4 h-4 mr-2" /> Nuevo Cliente
                    </Button>
                </div>

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

                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: "bold" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientesFiltrados
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((cliente) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={cliente.id}>
                                            <TableCell>{cliente.nombres}</TableCell>
                                            <TableCell>{cliente.apellidos}</TableCell>
                                            <TableCell>{cliente.telefono}</TableCell>
                                            <TableCell>{cliente.fechaEntrega}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={() => handleDelete(cliente)}
                                                    color="error"
                                                    size="small">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={clientesFiltrados.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            {/* Modal para nuevo cliente */}
            {dialogOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h2 className="mb-4 text-xl font-bold">Nuevo Cliente</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input
                                {...register("nombres")}
                                placeholder="Nombres"
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                {...register("apellidos")}
                                placeholder="Apellidos"
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                {...register("telefono")}
                                placeholder="Teléfono"
                                className="w-full p-2 border rounded-md"
                            />
                            <input {...register("fechaEntrega")} type="date" className="w-full p-2 border rounded-md" />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleCloseDialog}
                                    className="px-4 py-2 border rounded-md"
                                    disabled={isLoading}>
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md"
                                    disabled={isLoading}>
                                    {isLoading ? "Creando..." : "Crear"}
                                </button>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Modal de confirmación de eliminación */}
            {deleteDialogOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h2 className="mb-4 text-xl font-bold">¿Está seguro?</h2>
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
                    </ModalContent>
                </ModalOverlay>
            )}
        </div>
    );
};

export default Home;
