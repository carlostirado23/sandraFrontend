import { styled } from "@mui/material/styles";

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

const CustomModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};

export default CustomModal;
