// Medidas.jsx
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


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

const Medidas = ({ control }) => {
    return (
        <>
            {/* Measurements Section */}
            <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom>
                    Medidas
                </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="espalda"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Espalda"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="tDelantero"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="T Delantero"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="tTrasero"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="T Trasero"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="busto"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Busto"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="altBusto"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Altura Busto"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="sepBusto"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Separación Busto"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="cintura"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Cintura"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="siza"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Siza"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="larManga"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Largo Manga"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="contManga"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Contorno Manga"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="escote"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Escote"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="larTotal"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Largo Total"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="contCintura"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Contorno Cintura"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="cadera"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Cadera"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name="altCadera"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            type="number"
                            label="Altura Cadera"
                            InputProps={{
                                endAdornment: <span style={{ color: "#020113" }}>cm</span>,
                            }}
                        />
                    )}
                />
            </Grid>
        </>
    );
};

export default Medidas;
