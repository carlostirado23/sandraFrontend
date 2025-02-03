import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Grid, Box, Paper, Button } from "@mui/material";

const DetallesCliente = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Estado para almacenar los datos del cliente
    const [clienteData, setClienteData] = useState(() => {
        // Intenta obtener datos de location.state o de localStorage
        const storedData = localStorage.getItem("clienteData");
        return location.state?.cliente || (storedData ? JSON.parse(storedData) : {});
    });

    // Efecto para guardar datos en localStorage y manejar navegación directa
    useEffect(() => {
        if (Object.keys(clienteData).length === 0) {
            // Si no hay datos, redirigir a la página anterior o a un listado
            navigate("/", { replace: true });
        } else {
            // Guardar datos en localStorage para persistencia
            localStorage.setItem("clienteData", JSON.stringify(clienteData));
        }
    }, [clienteData, navigate]);

    // Si no hay datos, no renderizar nada
    if (Object.keys(clienteData).length === 0) {
        return null;
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", p: 2 }}>
            <Card elevation={6}>
                <CardHeader
                    title={
                        <Typography
                            variant="h4"
                            color="primary"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#000000",
                            }}>
                            Detalles de Medidas
                        </Typography>
                    }
                    sx={{
                        backgroundColor: "#fbfcff",
                        borderBottom: "1px solid #1976d2",
                    }}
                />
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Sección de información del cliente */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    sx={{ borderBottom: "2px solid #1976d2", pb: 1, mb: 2 }}>
                                    Información del Cliente
                                </Typography>
                                <Typography>
                                    <strong>Cliente:</strong> {clienteData.nombres} {clienteData.apellidos}
                                </Typography>
                                <Typography>
                                    <strong>Teléfono:</strong> {clienteData.telefono}
                                </Typography>
                                <Typography>
                                    <strong>Tipo de tela:</strong> {clienteData.tipoTela}
                                </Typography>
                                <Typography>
                                    <strong>Fecha de prueba:</strong> {clienteData.fechaPrueba}
                                </Typography>
                                <Typography>
                                    <strong>Fecha de entrega:</strong> {clienteData.fechaEntrega}
                                </Typography>
                                <Typography>
                                    <strong>Precio total:</strong>
                                    {" $"}
                                    {new Intl.NumberFormat("es-ES").format(clienteData.precio)}
                                </Typography>
                                <Typography>
                                    <strong>Adelanto:</strong>
                                    {" $"}
                                    {new Intl.NumberFormat("es-ES").format(clienteData.adelanto)}
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Sección de medidas */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    sx={{ borderBottom: "2px solid #1976d2", pb: 1, mb: 2 }}>
                                    Medidas del Cliente
                                </Typography>
                                <Typography>
                                    <strong>Espalda:</strong> {clienteData.espalda}
                                </Typography>
                                <Typography>
                                    <strong>T. Delantero:</strong> {clienteData.tDelantero}
                                </Typography>
                                <Typography>
                                    <strong>T. Trasero:</strong> {clienteData.tTrasero}
                                </Typography>
                                <Typography>
                                    <strong>Busto:</strong> {clienteData.busto}
                                </Typography>
                                <Typography>
                                    <strong>Altura busto:</strong> {clienteData.altBusto}
                                </Typography>
                                <Typography>
                                    <strong>Separación de busto:</strong> {clienteData.sepBusto}
                                </Typography>
                                <Typography>
                                    <strong>Cintura:</strong> {clienteData.cintura}
                                </Typography>
                                <Typography>
                                    <strong>Siza:</strong> {clienteData.siza}
                                </Typography>
                                <Typography>
                                    <strong>Largo manga:</strong> {clienteData.larManga}
                                </Typography>
                                <Typography>
                                    <strong>Contorno manga:</strong> {clienteData.contManga}
                                </Typography>
                                <Typography>
                                    <strong>Escote:</strong> {clienteData.escote}
                                </Typography>
                                <Typography>
                                    <strong>Contorno cintura:</strong> {clienteData.contCintura}
                                </Typography>
                                <Typography>
                                    <strong>Cadera:</strong> {clienteData.cadera}
                                </Typography>
                                <Typography>
                                    <strong>Altura cadera:</strong> {clienteData.altCadera}
                                </Typography>
                                <Typography>
                                    <strong>Largo total:</strong> {clienteData.larTotal}
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Imagen del cliente */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "grid", justifyContent: "center", mt: 2 }}>
                                <Card elevation={4} sx={{ maxWidth: 400, p: 2, borderRadius: 2 }}>
                                    <img
                                        src={clienteData.imagen || "./asset/img/maniqui.png"}
                                        alt="Diseño o Referencia"
                                        style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
                                    />
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="outlined" onClick={() => navigate("/")} >
                                Regresar
                            </Button>
                        </Box>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DetallesCliente;
