import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useSnack } from "../contexts/SnackBarContext";
export default function SnackBar({ open = false, value = "" }) {
  const handleClick = useSnack();
  const handleClose = () => {
    handleClick("", false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={value}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%", bgcolor: "primary.main" }}
      >
        {value}
      </Alert>
    </Snackbar>
  );
}
