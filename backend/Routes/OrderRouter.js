const express = require("express");
const Order = require("../Models/orders");
const Customer = require("../Models/customers");

const router = express.Router();
//below was fine v5
// router.post("/", async (req, res) => {
//   try {
//     const { customer, ...orderData } = req.body;

//     //validdate the customer id
//     const existingCustomer = await Customer.findById(customer);
//     if (!existingCustomer) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     const newOrder = new Order({ ...orderData, customer });
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//new v5
router.post("/", async (req, res) => {
  const {
    orderId,
    orderDate,
    bookedBy,
    startDate,
    completionDate,
    paymentDueDate,
    projectHead,
    customer,
    address,
    billTo,
    quotationNumber,
    quotationDate,
    poPiNumber,
    poPiDate,
    transportationCost,
    amountWithGST,
    totalAmount,
  } = req.body;

  try {
    // Check for duplicate orderId
    // const existingOrder = await Order.findOne({ orderId });
    // if (existingOrder) {
    //   return res.status(400).json({ error: "Order ID already exists." });
    // }

    // // Validate Customer ID
    // const existingCustomer = await Customer.findById(customer);
    // if (!existingCustomer) {
    //   return res.status(404).json({ error: "Customer not found." });
    // }

    // Create new order
    const newOrder = new Order({
      orderId,
      orderDate,
      bookedBy,
      startDate,
      completionDate,
      paymentDueDate,
      projectHead,
      customer,
      address,
      billTo,
      quotationNumber,
      quotationDate,
      poPiNumber,
      poPiDate,
      transportationCost,
      amountWithGST,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//getting alll the orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("customer");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { customer, ...orderData } = req.body;

    //if updated validate trhe customer (trial)

    if (customer) {
      const existingCustomer = await Customer.findById(customer);
      if (!existingCustomer) {
        return res.status(400).json({ error: "Invalid customer ID" });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { ...orderData, customer },
      { new: true }
    ).populate("customer");

    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// const express = require("express");
// const Order = require("../Models/orders");
// const router = express.Router();

// // Create a new order
// router.post("/", async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => ({
//         message: err.message,
//         path: err.path,
//       }));
//       res.status(400).json({
//         error: "Validation failed",
//         details: errors,
//       });
//     } else {
//       res.status(500).json({
//         error: error.message,
//         stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//       });
//     }
//   }
// });

// // below all unique customers with their latest details
// router.get("/customers", async (req, res) => {
//   try {
//     const customers = await Order.aggregate([
//       { $sort: { _id: -1 } },
//       {
//         $group: {
//           _id: "$customer",
//           customer: { $first: "$customer" },
//           contactPerson: { $first: "$contactPerson" },
//           mobileNumber: { $first: "$mobileNumber" },
//           email: { $first: "$email" },
//           deliveryAddress: { $first: "$deliveryAddress" },
//           gstNumber: { $first: "$gstNumber" },
//           billTo: { $first: "$billTo" },
//           quotationNumber: { $first: "$quotationNumber" },
//           poPiNumber: { $first: "$poPiNumber" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           customer: 1,
//           contactPerson: 1,
//           mobileNumber: 1,
//           email: 1,
//           deliveryAddress: 1,
//           gstNumber: 1,
//           billTo: 1,
//           quotationNumber: 1,
//           poPiNumber: 1,
//         },
//       },
//     ]);
//     res.status(200).json(customers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // below all orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // bwlow a single order by id
// router.get("/:id", async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ error: "Order not found" });
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // below update an order
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedOrder)
//       return res.status(404).json({ error: "Order not found" });
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete orrder
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder)
//       return res.status(404).json({ error: "Order not found" });
//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
