import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Search, Plus, Trash2 } from "lucide-react";

const Home = () => {
    const { register, handleSubmit, reset } = useForm();
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

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

    const handleOpenDialog = () => {
        setDialogOpen(true);
        reset();
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        reset();
    };

   const onSubmit = (data) => {
       axios
           .post(`${import.meta.env.VITE_USER_API}/api/clientes`, data) // Agrega la URL base
           .then((response) => {
               const nuevoCliente = {
                   ...response.data,
                   fechaEntrega: formatearFecha(response.data.fechaEntrega),
               };
               setClientes((prev) => [...prev, nuevoCliente]);
               handleCloseDialog();
           })
           .catch((error) => console.error("Error al crear cliente:", error));
   };

    const handleDelete = (cliente) => {
        setSelectedClient(cliente);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        axios
            .delete(`${import.meta.env.VITE_USER_API}/api/clientes/${selectedClient.id}`) // Agrega la URL base
            .then(() => {
                setClientes((prev) => prev.filter((cliente) => cliente.id !== selectedClient.id));
                setDeleteDialogOpen(false);
                setSelectedClient(null);
            })
            .catch((error) => console.error("Error al eliminar cliente:", error));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Registro de Clientes</h1>
                    <button
                        onClick={handleOpenDialog}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                        <Plus className="h-4 w-4 mr-2" /> Nuevo Cliente
                    </button>
                </div>

                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="rounded-md border">
                    {clientesFiltrados.map((cliente) => (
                        <div key={cliente.id} className="grid grid-cols-5 gap-4 px-4 py-3 hover:bg-gray-50">
                            <div className="text-center">{cliente.nombres}</div>
                            <div className="text-center">{cliente.apellidos}</div>
                            <div className="text-center">{cliente.telefono}</div>
                            <div className="text-center">{cliente.fechaEntrega}</div>
                            <div className="text-center">
                                <button
                                    onClick={() => handleDelete(cliente)}
                                    className="text-red-600 hover:text-red-800">
                                    <Trash2 className="h-4 w-4 mx-auto" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para nuevo cliente */}
            {dialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>
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
                                    className="border rounded-md px-4 py-2">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {deleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-4">¿Está seguro?</h2>
                        <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setDeleteDialogOpen(false)} className="border rounded-md px-4 py-2">
                                Cancelar
                            </button>
                            <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-md">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
