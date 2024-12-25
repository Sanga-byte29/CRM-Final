// const Invoice = require("../Models/invoices");
// const Order = require("../Models/orders");

// exports.createInvoice = async (req, res) => {
//   // console.log("Request Body:", req.body); // Log the request body (done)

//   try {
//     ///vansh's method
//     //arrray of object
//     const invoices = req.body; //stores the array of objs
//     //custom check
//     if (!Array.isArray(invoices)) {
//       return res.status(400).json({ message: "expected an array of invoices" });
//     }

//     const createdInvoices = [];

//     for (const invoiceData of invoices) {
//       const { orderId, invoiceId, invoiceNumber, invoiceDate } = invoiceData;

//       //check missing required fields
//       if (!orderId || !invoiceNumber || !invoiceDate) {
//         return res.status(400).json({ message: "Missing required fields." });
//       }

//       //query the Orderschema to find the order
//       const order = await Order.findOne({ orderId: orderId }); //string used

//       if (!order) {
//         return res
//           .status(400)
//           .json({ message: `Order with ID ${orderId} not found.` });
//       }

//       //creating new invoice
//       const newInvoice = new Invoice({
//         orderId: order._id, //objid of the matched order
//         invoiceId: invoiceId || "generated-id", //will add later
//         invoiceNumber,
//         invoiceDate: new Date(invoiceDate), //convert to date
//       });

//       const savedInvoice = await newInvoice.save();
//       createdInvoices.push(savedInvoice);
//     }

//     //respond with the created invoices
//     res.status(201).json(createdInvoices);
//   } catch (err) {
//     console.error("Error creating invoice:", err);
//     res
//       .status(500)
//       .json({ message: "Error creating invoice", error: err.message });
//   }
// };

// exports.getAllInvoices = async (req, res) => {
//   try {
//     const invoices = await Invoice.find().populate("orderId");
//     res.status(200).json(invoices);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching invoices", error: err.message });
//   }
// };
// exports.getInvoiceById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const invoice = await Invoice.findById(id).populate("orderId");

//     if (!invoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     res.status(200).json(invoice);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching invoice", error: err.message });
//   }
// };
// exports.updateInvoice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { orderId, invoiceId, invoiceNumber, invoiceDate } = req.body;

//     const updatedInvoice = await Invoice.findByIdAndUpdate(
//       id,
//       { orderId, invoiceId, invoiceNumber, invoiceDate },
//       { new: true, runValidators: true } //givesus the  updated document and validates
//     );

//     if (!updatedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     res.status(200).json(updatedInvoice);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error updating invoice", error: err.message });
//   }
// };

// exports.deleteInvoice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedInvoice = await Invoice.findByIdAndDelete(id);

//     if (!deletedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Invoice deleted successfully", deletedInvoice });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error deleting invoice", error: err.message });
//   }
// };

//v6
const Invoice = require("../Models/invoices");
const Order = require("../Models/orders");
const { v4: uuidv4 } = require("uuid");

exports.createInvoice = async (req, res) => {
  try {
    const invoices = req.body; // Array of invoice objects

    if (!Array.isArray(invoices)) {
      return res.status(400).json({ message: "Expected an array of invoices" });
    }

    const createdInvoices = [];

    for (const invoiceData of invoices) {
      const { orderId, invoiceId, invoiceNumber, invoiceDate } = invoiceData;

      // Check for missing required fields
      if (!orderId || !invoiceNumber || !invoiceDate) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      // Find the order by orderId
      const order = await Order.findOne({ orderId: orderId });

      if (!order) {
        return res
          .status(400)
          .json({ message: "Order with ID ${orderId} not found." });
      }

      // Create a new invoice
      const newInvoice = new Invoice({
        orderId: order._id, // ObjectId of the matched order
        invoiceId: invoiceId || uuidv4(), // Generate unique ID if not provided
        invoiceNumber,
        invoiceDate: new Date(invoiceDate), // Convert to Date object
      });

      const savedInvoice = await newInvoice.save();
      createdInvoices.push(savedInvoice);
    }

    // Respond with the created invoices
    res.status(201).json(createdInvoices);
  } catch (err) {
    console.error("Error creating invoice:", err);
    res
      .status(500)
      .json({ message: "Error creating invoice", error: err.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("orderId");
    res.status(200).json(invoices);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: err.message });
  }
};
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id).populate("orderId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoice", error: err.message });
  }
};
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, invoiceId, invoiceNumber, invoiceDate } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { orderId, invoiceId, invoiceNumber, invoiceDate },
      { new: true, runValidators: true } //givesus the  updated document and validates
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating invoice", error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res
      .status(200)
      .json({ message: "Invoice deleted successfully", deletedInvoice });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting invoice", error: err.message });
  }
};