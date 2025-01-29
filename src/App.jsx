import { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const clientesIniciales = [
    { id: 1, nombre: "Ana", apellido: "Pérez", telefono: "123-456-7890", fechaEntrega: "2024-09-10" },
    { id: 2, nombre: "María", apellido: "López", telefono: "098-765-4321", fechaEntrega: "2024-09-15" },
];

const App = () => {
    const [clientes, setClientes] = useState(clientesIniciales);
    const [busqueda, setBusqueda] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        fechaEntrega: "",
    });

    const clientesFiltrados = clientes.filter((cliente) =>
        (cliente.nombre + " " + cliente.apellido).toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (selectedClient) {
            setClientes((prev) =>
                prev.map((cliente) => (cliente.id === selectedClient.id ? { ...formData, id: cliente.id } : cliente))
            );
        } else {
            const newClient = {
                id: clientes.length + 1,
                ...formData,
            };
            setClientes((prev) => [...prev, newClient]);
        }
        handleCloseDialog();
    };

    const handleDelete = (cliente) => {
        setSelectedClient(cliente);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        setClientes((prev) => prev.filter((cliente) => cliente.id !== selectedClient.id));
        setDeleteDialogOpen(false);
        setSelectedClient(null);
    };

    const handleEdit = (cliente) => {
        setSelectedClient(cliente);
        setFormData(cliente);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedClient(null);
        setFormData({
            nombre: "",
            apellido: "",
            telefono: "",
            fechaEntrega: "",
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Registro de Clientes</h1>
                        <button
                            onClick={() => setDialogOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Cliente
                        </button>
                    </div>
                </div>

                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="rounded-md border border-gray-200">
                    <div className="min-w-full divide-y divide-gray-200">
                        <div className="bg-gray-50">
                            <div className="grid grid-cols-5 gap-4 px-4 py-3 font-semibold text-sm">
                                <div>Nombre</div>
                                <div>Apellido</div>
                                <div>Teléfono</div>
                                <div>Fecha Entrega</div>
                                <div className="text-right">Acciones</div>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200 bg-white">
                            {clientesFiltrados.map((cliente) => (
                                <div key={cliente.id} className="grid grid-cols-5 gap-4 px-4 py-3 hover:bg-gray-50">
                                    <div className="font-medium">{cliente.nombre}</div>
                                    <div>{cliente.apellido}</div>
                                    <div>{cliente.telefono}</div>
                                    <div>{cliente.fechaEntrega}</div>
                                    <div className="text-right">
                                        <button
                                            onClick={() => handleEdit(cliente)}
                                            className="text-gray-600 hover:text-gray-900 p-2">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cliente)}
                                            className="text-red-600 hover:text-red-800 p-2">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para Crear/Editar Cliente */}
            {dialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedClient ? "Editar Cliente" : "Nuevo Cliente"}</h2>
                            <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700">
                                ×
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Apellido</label>
                                <input
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Teléfono</label>
                                <input
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Fecha de Entrega</label>
                                <input
                                    name="fechaEntrega"
                                    type="date"
                                    value={formData.fechaEntrega}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={handleCloseDialog}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {selectedClient ? "Guardar Cambios" : "Crear Cliente"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación para Eliminar */}
            {deleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-4">¿Está seguro?</h2>
                        <p className="text-gray-600 mb-6">
                            Esta acción no se puede deshacer. Se eliminará permanentemente el cliente de la base de
                            datos.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteDialogOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
