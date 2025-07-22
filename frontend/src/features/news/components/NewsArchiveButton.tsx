import { Button } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/MoveToInbox";

interface Props {
  id: string;
  onArchive: (id: string) => void;
}

export default function NewsArchiveButton({ id, onArchive }: Props) {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      startIcon={<ArchiveIcon />}
      onClick={() => onArchive(id)}
      sx={{
        fontWeight: 500,
        textTransform: "none"
      }}
    >
      Archivar
    </Button>
  );
}
