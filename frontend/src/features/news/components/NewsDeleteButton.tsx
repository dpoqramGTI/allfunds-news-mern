import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  onClick: () => void;
}

export default function NewsDeleteButton({ onClick }: Props) {
  return (
    <Button
      size="small"
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={onClick}
      sx={{
        backgroundColor: "rgba(243, 33, 33, 0.8)",
        color: "#fff",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": { backgroundColor: "rgba(138, 17, 17, 1)" }
      }}
    >
      Eliminar
    </Button>
  );
}
