import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";
import { useOrderContext } from "../../../context/OrderContext";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

const InvoiceForm = () => {
  const { orderId, generateOrderId } = useOrderContext();
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [invoiceForms, setInvoiceForms] = useState([
    {
      invoiceId: "",
      invoiceNumber: "",
      invoiceDate: null,
    },
  ]);

  //form submit handler
  const handleSubmitInvoice = async () => {
    if (!orderId) {
      toast.error("Order ID is still generating. Please wait.");
      return;
    }

    // Validate if all required fields are filled
    const isValid = invoiceForms.every((form) => form.invoiceNumber && form.invoiceDate);

    if (!isValid) {
      toast.error("Please fill in all required fields (Invoice Number, Invoice Date).");
      return;
    }

    try {
      // Prepare the data to send
      const invoiceData = invoiceForms.map((form) => {
        const data = {
          orderId,
          invoiceNumber: form.invoiceNumber,
          invoiceDate: form.invoiceDate ? form.invoiceDate.format("YYYY-MM-DD") : null, // Ensure invoiceDate is properly formatted
        };

        // Include invoiceId only if it exists and is valid
        if (form.invoiceId && form.invoiceId.trim() !== "") {
          data.invoiceId = form.invoiceId;
        }

        return data;
      });

      console.log("Prepared Invoice Data:", JSON.stringify(invoiceData, null, 2));

      // Send the POST request
      const response = await axios.post("http://localhost:8080/invoices", invoiceData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Invoices submitted successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      // Log detailed error info for debugging
      console.error("Error submitting the Invoice Form:", error);

      if (error.response) {
        console.error("Server Response Error:", error.response.data);
        toast.error(
          `Failed to submit the invoice. Server returned: ${error.response.status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        toast.error("Failed to submit the invoice. No response received from the server.");
      } else {
        console.error("Request setup error:", error.message);
        toast.error(`Failed to submit the invoice. Error: ${error.message}`);
      }
    }
  };

  //ad by clicking plus
  const handleAddInvoiceForm = () => {
    setInvoiceForms([...invoiceForms, { invoiceId: "", invoiceNumber: "", invoiceDate: null }]);
  };

  //remove by clicking minus
  const handleRemoveInvoiceForm = (id) => {
    setInvoiceForms(invoiceForms.filter((form) => form.id !== id));
  };

  //changes handing in input fields
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setInvoiceForms((prevForms) =>
      prevForms.map((form) => (form.id === id ? { ...form, [name]: value } : form))
    );
  };

  // GENERATE ORER id if not generated
  useEffect(() => {
    const fetchOrderId = async () => {
      if (!orderId) {
        await generateOrderId();
      }
    };
    fetchOrderId();
  }, [orderId, generateOrderId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={12} md={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={2}>
          <Typography variant="h4" fontWeight="bold" mt={4} mb={3}>
            Invoice Details
          </Typography>
        </Box>

        {/*loop through invoice forms */}
        {invoiceForms.length > 0 &&
          invoiceForms.map((form, index) => (
            <Box
              key={index}
              mb={4}
              border="1px solid #e0e0e0"
              borderRadius="8px"
              p={3}
              mx={2}
              bgcolor="#f9f9f9"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Order ID"
                    name="orderId"
                    disabled
                    value={orderId || "Loading..."}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Invoice Number"
                    fullWidth
                    name="invoiceNumber"
                    value={form.invoiceNumber}
                    onChange={(e) => handleInputChange(e, form.id)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Invoice Attachment"
                    type="file"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-file-alt"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Invoice Date"
                    value={form.invoiceDate ? form.invoiceDate : null}
                    onChange={(newValue) => {
                      const updatedForm = { ...form, invoiceDate: newValue };
                      setInvoiceForms(
                        invoiceForms.map((f) => (f.id === form.id ? updatedForm : f))
                      );
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="contained"
                  style={{
                    display: "flex-start",
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "#fff",
                    textTransform: "none",
                    padding: "8px 24px",
                  }}
                  onClick={handleSubmitInvoice}
                >
                  Submit Invoice
                </Button>
                <IconButton onClick={() => handleRemoveInvoiceForm(form.id)} color="error">
                  <RemoveCircleIcon />
                </IconButton>
                <IconButton onClick={handleAddInvoiceForm} color="primary">
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        <ToastContainer />
      </Grid>
    </LocalizationProvider>
  );
};

export default InvoiceForm;
