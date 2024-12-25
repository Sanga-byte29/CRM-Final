import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

//below new add
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ShowInvoice from "./ShowInvoice";
import ShowLogistics from "./ShowLogistics";
import ShowPayment from "./ShowPayment";
import ViewModal from "modals/ViewModal";

// import CreateOrder from "./CreateOrder"; // Import your CreateOrder component

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("my request");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);

  // Fetch customers (separate useEffect)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        const customersMap = response.data.reduce((map, customer) => {
          map[customer._id] = customer;
          return map;
        }, {});
        setCustomers(customersMap);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCreateOrder = () => {
    setShowCreateOrder(true);
  };

  const handleRequestChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedRequest === "all requests") {
      return order.orderId.toString().includes(searchQuery);
    } else {
      return order.orderId.toString().includes(searchQuery) && order.userId === "your_user_id"; // Replace 'your_user_id' with the actual user ID
    }
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        {/* Left side content (if any) */}
        <div style={{ width: "50px", backgroundColor: "#f0f0f0" }}>
          {/* Your left side content here */}
        </div>
        <Container style={{ flex: 1, padding: "2rem" }}>
          <Paper elevation={2} style={{ padding: "1.5rem", borderRadius: "8px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Order Management
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  component={Link}
                  to="/tables/order-form"
                  variant="contained"
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "white",
                  }}
                  onClick={handleCreateOrder}
                >
                  Create Order
                </Button>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    displayEmpty
                    value={selectedRequest}
                    onChange={handleRequestChange}
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
                    <MenuItem value="my request">My Request</MenuItem>
                    <MenuItem value="all requests">All Requests</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ m: 1, minWidth: 120, height: "40px" }}
                />
              </div>
            </Box>
            {/* {showCreateOrder && <CreateOrder />} */}
            <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
              <Table style={{ tableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  <TableRow
                    style={{
                      background: "linear-gradient(to right, #6a11cb, #2575fc)",
                      color: "#333",
                    }}
                  >
                    <TableCell
                      style={{
                        padding: "12px",
                        width: "15%", // Fixed width for consistent column size
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Order ID
                    </TableCell>
                    <TableCell
                      style={{
                        padding: "12px",
                        width: "20%", // Adjusted width
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Customer Name
                    </TableCell>
                    <TableCell
                      style={{
                        padding: "12px",
                        // width: "2%", // Adjusted width
                        // textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Quotation Number
                    </TableCell>
                    <TableCell
                      style={{
                        padding: "12px",
                        width: "20%", // Adjusted width
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{
                        padding: "12px",
                        width: "15%", // Adjusted width
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Phone Number
                    </TableCell>
                    <TableCell
                      style={{
                        padding: "12px",
                        width: "5%", // Adjusted width for action button
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => {
                    // const customer = customers[order.customer] || {};
                    // console.log(customer);
                    //below addition
                    const invoice = order.invoice || {};
                    const customer = customers[order.customer?._id] || {};
                    return (
                      <TableRow
                        key={order._id}
                        style={{
                          borderBottom: "1px solid #e0e0e0",
                          display: "flex",
                        }}
                      >
                        <TableCell style={{ padding: "12px 16px", width: "15%" }}>
                          {order.orderId}
                        </TableCell>

                        <TableCell style={{ padding: "12px 16px", width: "20%" }}>
                          {customer.contactName || "N/A"}
                        </TableCell>
                        <TableCell style={{ padding: "12px 16px", width: "20%" }}>
                          {order.quotationNumber}
                        </TableCell>
                        <TableCell style={{ padding: "12px 16px", width: "25%" }}>
                          {customer.email || "N/A"}
                        </TableCell>
                        <TableCell style={{ padding: "12px 16px", width: "15%" }}>
                          {customer.contactNumber || "N/A"}
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "12px 16px",
                            flexGrow: 1,
                          }}
                        >
                          {/* <Button
                            variant="outlined"
                            size="small"
                            style={{
                              color: "#1976d2",
                              borderColor: "#1976d2",
                            }}
                            onClick={() => handleAction(order)}
                          >
                            View
                          </Button> */}
                          <ViewModal
                            order={{
                              id: order.orderId,
                              name: customer.contactName || "N/A",
                              quotationNumber: order.quotationNumber,
                              email: customer.email || "N/A",
                              phoneNumber: customer.contactNumber || "N/A",
                              date: order.orderDate,
                            }}
                            invoice={{
                              id: invoice.orderId,
                              invoiceId: invoice.invoiceId,
                              invoiceNumber: invoice.invoiceNumber || "N/A",
                              invoiceDate:
                                new Date(invoice.invoiceDate).toLocaleDateString() || "N/A",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <ShowInvoice />
          {/* <ShowLogistics />
          <ShowPayment /> */}
        </Container>
      </div>
    </DashboardLayout>
  );

  function handleAction(order) {
    console.log("Action clicked for order:", order);
  }
}

export default OrderManagement;
