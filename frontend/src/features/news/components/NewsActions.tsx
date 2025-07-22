import { useState } from "react";
import { Stack } from "@mui/material";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import NewsArchiveButton from "./NewsArchiveButton";
import NewsDeleteButton from "./NewsDeleteButton";

interface Props {
  id: string;
  onArchive?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function NewsActions({ id, onArchive, onRemove }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => setConfirmOpen(true);
  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    onRemove?.(id);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {onArchive && <NewsArchiveButton id={id} onArchive={onArchive} />}
        {onRemove && <NewsDeleteButton onClick={handleDeleteClick} />}
      </Stack>

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
