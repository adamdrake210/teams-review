import React, { ReactNode } from "react";
import { Modal, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Loading } from "../Loading";

const useStyles = makeStyles<Theme>((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[20],
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
    width: "100%",
    maxWidth: 600,
  },
}));

type Props = {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
  error?: Error;
};

export default function ModalContainer({
  handleClose,
  open,
  children,
  error,
}: Props) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={classes.paper}>
        {!error ? children : <Loading error={error} isError />}
      </div>
    </Modal>
  );
}
