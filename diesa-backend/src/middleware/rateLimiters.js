const rateLimit = require("express-rate-limit");

module.exports = {
  // 🔐 AUTH
  loginLimiter: rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5,
    message: { status: 429, error: "Too many login attempts. Try again in a minute." },
  }),

  registerLimiter: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: { status: 429, error: "Too many registrations. Try later." },
  }),

  forgotPasswordLimiter: rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many reset attempts. Please wait." },
  }),

  otpLimiter: rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many OTP requests." },
  }),

  // 🧾 PAYMENT
  paymentInitLimiter: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    message: { status: 429, error: "Too many payment attempts. Slow down." },
  }),

  paymentVerifyLimiter: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many verifications. Please wait." },
  }),

  // 📩 CONTACT / FEEDBACK
  contactLimiter: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    message: { status: 429, error: "Too many messages sent. Try later." },
  }),

  // 🌍 PUBLIC ROUTES
  publicApiLimiter: rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { status: 429, error: "Too many public requests. Wait a moment." },
  }),

  // ⚙️ ADMIN ROUTES
  adminLoginLimiter: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many admin login attempts." },
  }),

  adminDeleteLimiter: rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: { status: 429, error: "Too many delete actions. Wait!" },
  }),

  // 🔄 HEAVY OPERATIONS
  reportGenLimiter: rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: { status: 429, error: "Too many reports requested. Please wait." },
  }),

  progressAnalyzeLimiter: rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many analysis requests." },
  }),

  exportLimiter: rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: { status: 429, error: "Too many exports." },
  }),
};
