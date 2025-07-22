import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from "@mui/material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ open, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          padding: 2,
          background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
        },
        backdropFilter: "blur(4px)"
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <Typography align="center" sx={{ color: "#333", fontSize: 15 }}>
          ¿Estás seguro de que quieres eliminar esta noticia? Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(255,0,0,0.4)"
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
