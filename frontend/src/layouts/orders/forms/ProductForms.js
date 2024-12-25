import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs"; //ADDITION
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomerModal from "modals/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useOrderContext } from "../../../context/OrderContext";
import { ToastContainer, toast } from "react-toastify";

const ProductForm = () => {
  const { orderId, generateOrderId } = useOrderContext();
  const [productForms, setProductForms] = useState([
    {
      id: 1,
      productType: "",
      productName: "",
      machineName: "",
      packagingDate: "",
      quantity: "",
      unit: "",
      lotNumber: "",
      sku: "",
      qualityInCharge: "",
      packagingInCharge: "",
      operatorName: "",
      shift: "",
      comment: "",
    },
  ]);
  const handleAddForm = () => {
    setProductForms([...productForms, { id: Date.now() }]);
  };

  const handleRemoveForm = (id) => {
    setProductForms(productForms.filter((form) => form.id !== id));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // useEffect with async operation to handle order ID generation
  useEffect(() => {
    const fetchOrderId = async () => {
      if (!orderId) {
        // Call the async function to generate the orderId
        await generateOrderId();
      }
    };

    fetchOrderId(); // Run the async function when the component mounts or when orderId is null
  }, [orderId, generateOrderId]);
  return (
    <Grid item xs={12} md={12}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={2}>
        <Typography variant="h4" fontWeight="bold" mt={4} mb={3}>
          Product Details
        </Typography>
      </Box>
      {productForms.length > 0 &&
        productForms.map((form, index) => (
          <Box
            key={form.id}
            mb={4}
            border="1px solid #e0e0e0"
            borderRadius="8px"
            p={3}
            mx={2}
            bgcolor="#f9f9f9"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Order ID"
                  name="orderId"
                  disabled
                  value={orderId || "Loading..."}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Product Type"
                  fullWidth
                  select
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "gray",
                      },
                      height: "40px !important",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSelect-select": {
                      padding: "0 10px",
                      height: "40px !important",
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                >
                  <MenuItem value="type1">Type 1</MenuItem>
                  <MenuItem value="type2">Type 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField label="Product Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Machine Name and Number" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Packaging/Manufacturing Date"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Quantity" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Unit" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Lot No/Batch No" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Start Time"
                  fullWidth
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="End Time"
                  fullWidth
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="SKU/Variant" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Quality In-Charge" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Packaging/Processing In-Charge" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Operator Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Shift" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Comments" fullWidth multiline rows={2} />
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
              >
                Save
              </Button>
              <IconButton onClick={() => handleRemoveForm(form.id)} color="error">
                <RemoveCircleIcon />
              </IconButton>
              <IconButton onClick={() => handleAddForm(form.id)} color="error">
                <AddCircleIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
    </Grid>
  );
};

export default ProductForm;
