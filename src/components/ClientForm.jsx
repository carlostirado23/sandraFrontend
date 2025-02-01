import { useForm } from "react-hook-form";
import Compressor from "compressorjs";

const ClientForm = ({ onSubmit, isLoading, onCancel, handleCloseDialog }) => {
    const { register, handleSubmit, setValue } = useForm(); // Ahora setValue está disponible


    const comprimirImagen = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 1024,
                maxHeight: 1024,
                success(result) {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
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
                setValue("imagen", imagenComprimida); // Establecer imagen comprimida
            } catch (error) {
                console.error("Error al comprimir la imagen:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("nombres")} placeholder="Nombre" className="w-full p-2 border rounded-md" />
            <input {...register("apellidos")} placeholder="Apellido" className="w-full p-2 border rounded-md" />
            <input {...register("telefono")} placeholder="Teléfono" className="w-full p-2 border rounded-md" />
            <input {...register("fechaEntrega")} type="date" className="w-full p-2 border rounded-md" />

            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
            {/* Botones de acción */}
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={handleCloseDialog}
                    className="px-4 py-2 border rounded-md"
                    disabled={isLoading}>
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md" disabled={isLoading}>
                    {isLoading ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </form>
    );
};

export default ClientForm;
