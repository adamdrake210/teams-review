import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type EditButtonProps = {
  onClick: () => void;
  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export const DeleteButton = ({ onClick, color }: EditButtonProps) => {
  return (
    <IconButton color="warning" onClick={onClick}>
      <DeleteIcon color={color} />
    </IconButton>
  );
};
