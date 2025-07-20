const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  otpLimiter
} = require("../middleware/rateLimiters");

// ✅ Register route with rate limiting
router.post("/register", registerLimiter, authController.registerUser);

// ✅ Login route with rate limiting
router.post("/login", loginLimiter, authController.login);

// 🕒 Placeholder - Implementations can be added later
router.post("/forgot-password", forgotPasswordLimiter, authController.forgotPassword || ((req, res) => {
  res.status(501).json({ message: "Forgot password not implemented yet" });
}));

router.post("/send-otp", otpLimiter, authController.sendOtp || ((req, res) => {
  res.status(501).json({ message: "Send OTP not implemented yet" });
}));

module.exports = router;
