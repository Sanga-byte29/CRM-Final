const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const EnsureAuthentication = require("./Routes/ensureAuthentication");
const OrderRouter = require("./Routes/OrderRouter");
const CustomerRouter = require("./Routes/CustomerRouter");

const InvoiceRouter = require("./Routes/InvoiceRouter");
const PaymentRouter = require("./Routes/PaymentRouter");
const LogisticRouter = require("./Routes/LogisticRouter");

const UserModel = require("./Models/User");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.get("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, //check that the token hasn't expired
    });

    if (!user) {
      return res.status(400).send("Invalid or expired reset token.");
    }

    res.send(`
      <form action="/reset-password/${token}" method="POST">
        <input type="password" name="password" placeholder="New password" required />
        <button type="submit">Reset Password</button>
      </form>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
});

app.post("/reset-password/:token", async (req, res) => {
  try {
    if (!req.body || !req.body.password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.use("/auth", AuthRouter);
app.use("/checkAuth", EnsureAuthentication);
app.use("/orders", OrderRouter);
app.use("/customers", CustomerRouter);
app.use("/invoices", InvoiceRouter);
app.use("/logistics", LogisticRouter);
app.use("/payments", PaymentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
