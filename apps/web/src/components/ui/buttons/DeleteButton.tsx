import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type EditButtonProps = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: EditButtonProps) => {
  return (
    <IconButton color="warning" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
};
