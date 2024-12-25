const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists , you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signed up successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "200d" }
    );

    res.status(200).json({
      message: "Logged in",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 3600000; // 1 hour expiration

    // Save the token and expiration in the user's record
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Create a reset URL
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

    // Nodemailer transport setup
    const transporter = nodemailer.createTransport({
      // host: "smtp.mail.yahoo.com", // Yahoo's SMTP server
      // port: 587, // TLS port (use 465 for SSL)
      // secure: false, // Set to true for port 465, false for 587
      // service: "Google", // Use your email service provider
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Use TLS
      secure: false, // Set to true if you are using SSL (port 465)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email message
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetURL}" target="_blank">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Password reset email sent",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
};
