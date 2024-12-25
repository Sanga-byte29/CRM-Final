import React, { useState } from "react";
import { Modal, Box, Typography, Button, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

function ViewInvoiceModal({ invoice }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "white",
        }}
      >
        View
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2">
              Invoice Details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Order ID:</strong> {invoice.id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Invoice ID:</strong> {invoice.invoiceId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Invoice Number:</strong> {invoice.invoiceNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Invoice Date:</strong> {invoice.invoiceDate}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleClose}
              style={{ background: "#6a11cb", color: "white" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewInvoiceModal;
