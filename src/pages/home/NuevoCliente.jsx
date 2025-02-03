import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Paper,
    Box,
    createTheme,
    ThemeProvider,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom"; // Se agregó useLocation
import axios from "axios";
import Compressor from "compressorjs";
import { Scissors, Camera } from "lucide-react";
import Medidas from "../../components/Medidas";

// Custom Theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#000000",
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
    color: "#ffffff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: "#12569b",
        color: "white",
    },
});

const NuevoCliente = () => {
    const { control, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const location = useLocation(); // Obtenemos la ubicación
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    // Si se pasó un cliente en el state, lo obtenemos para editar
    const cliente = location.state?.cliente;

    // Si existe el cliente, precargamos los datos en el formulario
   useEffect(() => {
       if (cliente) {
           setIsEditMode(true); // Estás editando
           setValue("nombres", cliente.nombres);
           setValue("apellidos", cliente.apellidos);
           setValue("telefono", cliente.telefono);
           setValue("espalda", cliente.espalda);
           setValue("tDelantero", cliente.tDelantero);
           setValue("tTrasero", cliente.tTrasero);
           setValue("busto", cliente.busto);
           setValue("altBusto", cliente.altBusto);
           setValue("sepBusto", cliente.sepBusto);
           setValue("cintura", cliente.cintura);
           setValue("siza", cliente.siza);
           setValue("larManga", cliente.larManga);
           setValue("contManga", cliente.contManga);
           setValue("escote", cliente.escote);
           setValue("larTotal", cliente.larTotal);
           setValue("contCintura", cliente.contCintura);
           setValue("cadera", cliente.cadera);
           setValue("altCadera", cliente.altCadera);
           setValue("tipoTela", cliente.tipoTela);
           setValue("fechaPrueba", cliente.fechaPrueba);
           setValue("fechaEntrega", cliente.fechaEntrega);
           setValue("precio", cliente.precio);
           setValue("adelanto", cliente.adelanto);
           setValue("imagen", cliente.imagen);
       } else {
           setIsEditMode(false); // Estás agregando un nuevo cliente
       }
   }, [cliente, setValue]);


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
            const clientData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
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

            if (cliente) {
                // Si existe el cliente, actualizamos (PUT)
                await axios.put(`${import.meta.env.VITE_USER_API}/api/clientes/${cliente.id}`, clientData);
                navigate("/", { state: { message: "Cliente actualizado exitosamente" } });
            } else {
                // Si no existe, creamos el cliente (POST)
                await axios.post(`${import.meta.env.VITE_USER_API}/api/clientes`, clientData);
                navigate("/", { state: { message: "Cliente creado exitosamente" } });
            }
        } catch (error) {
            console.error("Error al guardar cliente:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <StyledPaper elevation={0}>
                    <Box display="flex" alignItems="center" mb={3}>
                        <Scissors size={32} color="#000000" style={{ marginRight: 10 }} />
                        <Typography variant="h4" color="main">
                            {cliente ? "Editar Cliente" : "Nuevo Cliente"}
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
                                            required
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
                                <Box display="grid" alignItems="center" gap={2}>
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
                                        <div className="flex justify-center w-full">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                style={{
                                                    maxWidth: 300,
                                                    maxHeight: 300,
                                                    borderRadius: 8,
                                                }}
                                            />
                                        </div>
                                    )}
                                </Box>
                            </Grid>

                            {/* Action Buttons */}
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button variant="outlined" onClick={() => navigate("/")} disabled={isLoading}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={isLoading}>
                                        {
                                            isLoading
                                                ? "Cargando..."
                                                : isEditMode
                                                ? "Actualizar" // Si es modo de edición, mostrar "Actualizar"
                                                : "Agregar" // Si es agregar, mostrar "Agregar"
                                        }
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </StyledPaper>
            </Container>

            {/* Loader de pantalla completa */}
            <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </ThemeProvider>
    );
};

export default NuevoCliente;
