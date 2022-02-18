import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type EditButtonProps = {
  onClick: () => void;
};

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
};
