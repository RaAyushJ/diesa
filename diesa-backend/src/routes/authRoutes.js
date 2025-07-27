const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimiters");

// ✅ Register via Supabase
router.post("/register", registerLimiter, authController.registerUser);

// ✅ Login via Supabase
router.post("/login", loginLimiter, authController.login);

// ✅ Send Password Reset Email (Supabase sends the link)
router.post("/forgot-password", forgotPasswordLimiter, authController.forgotPassword);

module.exports = router;
