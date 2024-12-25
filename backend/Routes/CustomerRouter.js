const express = require("express");
const Customer = require("../Models/customers");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const newCustomer = new Customer(req.body);
//     const savedCustomer = await newCustomer.save();
//     res.status(201).json(savedCustomer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedCustomer = await Customer.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedCustomer)
//       return res.status(404).json({ error: "Customer not found" });
//     res.status(200).json(updatedCustomer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("contactName").notEmpty().withMessage("Contact name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCustomer = new Customer(req.body);
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer)
      return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
//     if (!deletedCustomer)
//       return res.status(404).json({ error: "Customer not found" });
//     res.status(200).json({ message: "Customer deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer)
      return res.status(404).json({ error: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
