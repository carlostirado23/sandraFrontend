import { useState } from "react";
import { TextField, Button, Grid, Typography, Container, Paper, Box, createTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Compressor from "compressorjs";
import { Scissors, Camera } from "lucide-react";
import Medidas from "../../components/Medidas";

// Custom Theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Soft purple
        },
        secondary: {
            main: "#1976d2", // Soft lavender
        },
    },
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
});

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: 16,
    padding: theme.spacing(4),
    background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
    boxShadow: "0 10px 30px rgba(142, 69, 133, 0.1)",
}));

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        "&:hover fieldset": {
            borderColor: "#303030",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#303030",
        },
    },
});

const ImageUploadButton = styled("label")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 15px",
    borderRadius: 12,
    backgroundColor: "#1976d2",
    color: "#000000",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: "#0f009b",
        color: "white",
    },
});

const NuevoCliente = () => {
    const { control, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const comprimirImagen = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 1024,
                maxHeight: 1024,
                success(result) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                        setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imagenComprimida = await comprimirImagen(file);
                setValue("imagen", imagenComprimida);
            } catch (error) {
                console.error("Error al comprimir la imagen:", error);
            }
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log("Datos del formulario:", data); // Verifica que las medidas estén aquí
            const clientData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
                // medidas
                espalda: data.espalda,
                tDelantero: data.tDelantero,
                tTrasero: data.tTrasero,
                busto: data.busto,
                altBusto: data.altBusto,
                sepBusto: data.sepBusto,
                cintura: data.cintura,
                siza: data.siza,
                larManga: data.larManga,
                contManga: data.contManga,
                escote: data.escote,
                larTotal: data.larTotal,
                contCintura: data.contCintura,
                cadera: data.cadera,
                altCadera: data.altCadera,

                tipoTela: data.tipoTela,
                fechaPrueba: data.fechaPrueba,
                fechaEntrega: data.fechaEntrega,
                precio: data.precio,
                adelanto: data.adelanto,
                imagen: data.imagen || "",
            };
            console.log("Datos a enviar:", clientData); // Verifica los datos que se van a enviar

            const response = await axios.post(`${import.meta.env.VITE_USER_API}/api/clientes`, clientData);
            console.log("Respuesta del servidor:", response.data);

            navigate("/", { state: { message: "Cliente creado exitosamente" } });
        } catch (error) {
            console.error("Error al crear cliente:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <StyledPaper elevation={0}>
                    <Box display="flex" alignItems="center" mb={3}>
                        <Scissors size={32} color="#1976d2" style={{ marginRight: 10 }} />
                        <Typography variant="h4" color="primary">
                            Nuevo Cliente
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            {/* Personal Details */}
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="nombres"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="apellidos"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Apellido"
                                            variant="outlined"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="telefono"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Teléfono"
                                            variant="outlined"
                                            required
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Measurements Section */}
                            <Medidas control={control} />

                            {/* Additional Details */}
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="tipoTela"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField {...field} fullWidth label="Tipo de Tela" variant="outlined" />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="fechaPrueba"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Fecha de Prueba"
                                            type="date"
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="fechaEntrega"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Fecha de Entrega"
                                            type="date"
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="precio"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Precio Total"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{
                                                startAdornment: <span style={{ color: "#000000" }}>$</span>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="adelanto"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Adelanto"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{
                                                startAdornment: <span style={{ color: "#000000" }}>$</span>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Image Upload */}
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <ImageUploadButton>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                        />
                                        <Camera size={20} style={{ marginRight: 8 }} />
                                        Subir Imagen
                                    </ImageUploadButton>
                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{
                                                maxWidth: 100,
                                                maxHeight: 100,
                                                borderRadius: 8,
                                            }}
                                        />
                                    )}
                                </Box>
                            </Grid>

                            {/* Action Buttons */}
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate("/")}
                                        disabled={isLoading}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                        {isLoading ? "Guardando..." : "Guardar"}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </StyledPaper>
            </Container>
        </ThemeProvider>
    );
};

export default NuevoCliente;
