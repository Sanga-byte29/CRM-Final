//import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import {
//   Box,
//   Button,
//   Container,
//   IconButton,
//   InputAdornment,
//   MenuItem,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import dayjs from "dayjs"; //ADDITION
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Autocomplete from "@mui/material/Autocomplete";
// import axios from "axios";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import CustomerModal from "modals/Modal";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { useOrderContext } from "../../../context/OrderContext";

// const InvoiceForm = () => {
//   const { orderId, generateOrderId } = useOrderContext();
//   const [invoiceDate, setInvoiceDate] = useState(null);
//   const [invoiceForms, setInvoiceForms] = useState([
//     {
//       //below v5 hardcoded
//       invoiceId: "",
//       invoiceNumber: "",
//       invoiceDate: "",
//     },
//   ]);
//   const handleSubmitInvoice = async () => {
//     if (!orderId) {
//       alert("Order ID is still generating. Please wait.");
//       return;
//     }
//     try {
//       const invoiceData = {
//         orderId,
//         invoiceId: invoiceForms.invoiceId || "1223",
//         invoiceDate: invoiceDate ? invoiceDate.format("YYYY-MM-DD") : null,
//         invoiceNumber: invoiceForms.invoiceNumber,
//       };
//       const response = await axios.post("http://localhost:8080/invoices", invoiceData);
//       alert("Order created successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error submitting the Invoice Form:", error);
//       alert("Failed to submit the invoice.");
//     }
//   };
//   const handleAddInvoiceForm = () => {
//     setInvoiceForms([...invoiceForms, { id: Date.now() }]);
//   };
//   const handleRemoveInvoiceForm = (id) => {
//     setInvoiceForms(invoiceForms.filter((form) => form.id !== id));
//   };
//   useEffect(() => {
//     const fetchOrderId = async () => {
//       if (!orderId) {
//         // Call the async function to generate the orderId
//         await generateOrderId();
//       }
//     };

//     fetchOrderId(); // Run the async function when the component mounts or when orderId is null
//   }, [orderId, generateOrderId]);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceForms((prev) => ({ ...prev, [name]: value }));
//   };
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Grid item xs={12} md={12}>
//         {/* Header Section */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={2}>
//           <Typography variant="h4" fontWeight="bold" mt={4} mb={3}>
//             Invoice Details
//           </Typography>
//           {/* <Button
//           onClick={handleAddInvoiceForm}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             color: "black",
//             width: "200px",
//             height: "47px",
//             padding: "0 15px",
//             fontSize: "13px",
//             position: "relative",
//             left: "25px",
//           }}
//         >
//           + Add Invoice Details
//         </Button> */}
//         </Box>

//         {/* Form Section */}
//         {invoiceForms.length > 0 &&
//           invoiceForms.map((form, index) => (
//             <Box
//               key={form.id}
//               mb={4}
//               border="1px solid #e0e0e0"
//               borderRadius="8px"
//               p={3}
//               mx={2}
//               bgcolor="#f9f9f9"
//             >
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Order ID"
//                     name="orderId"
//                     disabled
//                     value={orderId || "Loading..."}
//                     InputProps={{ readOnly: true }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Invoice Number"
//                     fullWidth
//                     name="invoiceNumber"
//                     value={invoiceForms.invoiceNumber}
//                     onChange={handleInputChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Invoice Attachment"
//                     type="file"
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <i className="fas fa-file-alt"></i>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 {/* v6 new addition */}
//                 <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Invoice Date"
//                     value={invoiceDate}
//                     onChange={(newValue) => setInvoiceDate(newValue)}
//                     sx={{ width: "100%" }}
//                     renderInput={(params) => <TextField {...params} fullWidth />}
//                   />
//                 </Grid>
//               </Grid>
//               <Box display="flex" justifyContent="flex-end" mt={2}>
//                 <Button
//                   variant="contained"
//                   style={{
//                     display: "flex-start",
//                     background: "linear-gradient(to right, #6a11cb, #2575fc)",
//                     color: "#fff",
//                     textTransform: "none",
//                     padding: "8px 24px",
//                   }}
//                   onClick={handleSubmitInvoice}
//                 >
//                   Submit Invoice
//                 </Button>
//                 <IconButton onClick={() => handleRemoveInvoiceForm(form.id)} color="error">
//                   <RemoveCircleIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleAddInvoiceForm(form.id)} color="error">
//                   <AddCircleIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           ))}
//       </Grid>
//     </LocalizationProvider>
//   );
// };

// export default InvoiceForm;
