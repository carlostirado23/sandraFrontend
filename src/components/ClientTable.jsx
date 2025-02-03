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

const columns = [
    { id: "imagen", label: "Imagen", minWidth: 130 },
    { id: "nombres", label: "Nombre", minWidth: 170 },
    { id: "apellidos", label: "Apellido", minWidth: 170 },
    { id: "telefono", label: "Teléfono", minWidth: 130 },
    { id: "fechaEntrega", label: "Fecha Entrega", minWidth: 170 },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
];

const ClientTable = ({
    clientesFiltrados,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDelete,
}) => {
    return (
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
                                    <TableCell>
                                        {cliente.imagen ? (
                                            <img
                                                src={cliente.imagen}
                                                alt={`Imagen de ${cliente.nombres}`}
                                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                            />
                                        ) : (
                                            "Sin imagen"
                                        )}
                                    </TableCell>
                                    <TableCell>{cliente.nombres}</TableCell>
                                    <TableCell>{cliente.apellidos}</TableCell>
                                    <TableCell>{cliente.telefono}</TableCell>
                                    <TableCell>{cliente.fechaEntrega}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleDelete(cliente)} color="error" size="small">
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
    );
};

export default ClientTable;
